const { validateUrl, readFileOrDirectory } = require('../Functions');
const axios  = require('axios');
const fs = require('fs');
const path = require('path');

jest.mock('axios');

describe('validateUrl', () => {
  describe('Case for OK', () => {
    it('must return status code 200', () => {
      axios.get.mockResolvedValue({ status: 200});
  
      return validateUrl(' ')
        .then(result => {
          expect(result).toEqual(200)
        });
    });
  });

  describe('Case for error', () => {
    it('must return error code 404', () => {
      axios.get.mockRejectedValue({code: 404});
    
      return validateUrl(' ')
        .then(result => {
          expect(result).toEqual(404)
        });
    });
  });
});

jest.mock('fs'); 
describe('readFileOrDirectory', () => {
  describe('readFileOrDirectory is Directory', () => {
    it('should resolve with md file path if the input is a directory', (done) => {
      const dirPath = 'absolutePath';
      const mdFilePath = path.join(dirPath, 'excalidraw.md');


      fs.stat.mockImplementation((mdFilePath, callback) => {
        const stats = {
          isDirectory: () => true,
        };
        callback(null, stats);
      });

      readFileOrDirectory(dirPath)
        .then((result) => {
          expect(result).toEqual(mdFilePath);
          done();
        })
        .catch((err) => {
          done(err); 
    });
  });
  });
});

