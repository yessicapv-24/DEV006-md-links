const path = require('path');
const { leermdLinks, readFileOrDirectory } = require('./Functions');

// returns a path resolved (an absolute path) 
const argv = require('minimist')(process.argv.slice(2));
let absolutePath;
let pathArray = argv._[0].split('');
if(path.isAbsolute(pathArray[0]) === false) {
  absolutePath = path.resolve(argv._[0]);
} else{
  absolutePath = argv._[0];
}

const validate = argv.validate === 'true';

const getMdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
  readFileOrDirectory(path)
  .then(filePath => {
    leermdLinks(filePath, validate)
      .then(results => {
        Promise.all(results).then(r => {
          resolve(r.flat());
        })
      })
      .catch(error => {
        reject(error);
      });
  })
  .catch(error => {
    reject(error);
  });
  });
 }

let result = getMdLinks(absolutePath, validate).then(links =>{
  console.log(links);
}) 
  
module.exports = {
  getMdLinks
}








 