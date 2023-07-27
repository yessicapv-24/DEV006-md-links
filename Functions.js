const fs = require('fs');
const path = require('path');
const HTMLParser = require('node-html-parser');
const axios = require('axios');



 //checks if the path is validate 
 function validateUrl(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url).then(response => {
        resolve(response.status); 
      })
      .catch(err => {
        resolve(err.code); 
      })
  });
}

// read if is file or directory
// get the md file 
function readFileOrDirectory(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(Error(`It is not a file: ${filePath}`));
      } else {
        if (stats.isDirectory()) {
          const mdFilePath = path.join(filePath, 'excalidraw.md');
          resolve(mdFilePath);
        } else if (stats.isFile()) {
          const ext = path.extname(filePath);
          if (ext === '.md') {
            resolve(filePath);
          } else {
            reject(new Error('El archivo no tiene extensión .md'));
          }
        } else {
          reject(new Error('La ruta no es ni un archivo ni un directorio'));
        }
      }
    });
  });
}

// link, text, file, status (4)
function leermdLinks(filePath, validate) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, contenido) => {
      if (error) {
        reject(error);
      } else {
        const regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
        const anchors = contenido.match(regex);
        if (anchors) {
          anchors.forEach((anchor) => {
            const root = HTMLParser.parse(anchor);
            const link = root.firstChild.attributes['href'];

            results.push(new Promise((resolve, reject) => {
              if(validate === true){
                validateUrl(link)
                .then(code => { 
                  resolve({
                    url: link,
                    text: root.firstChild.innerHTML,
                    file: filePath,
                    statusCode: code,
                    ok: code === 200 ? 'Ok' : 'Fail'
                })})
              }
              else{
                resolve({
                  url: link,
                  text: root.firstChild.innerHTML,
                  file: filePath              
                })
              }              
            }));
          });
          resolve(results);
        } else {
          console.log('No se encontraron elementos en el archivo.');
          reject('Error')
        }
      }
    });
  })
};



module.exports = { leermdLinks,
                    validateUrl,
                   readFileOrDirectory}


