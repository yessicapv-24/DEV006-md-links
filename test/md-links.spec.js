const { leermdLinks } = require('../Functions');
const filePath = "/Users/yess/Documents/JSLaboratoria/DEV006-md-links/excalidraw.md";

describe('leermdLinks',() => {
    describe('when validate is false', () => {
        it('Should validate links objects properties', () => {
        return leermdLinks(filePath, false)
            .then(links => {
                Promise.all(links).then(res => {
                    res.map(l => {
                    expect(l).toHaveProperty('text');
                    expect(l).toHaveProperty('url');
                    expect(l).toHaveProperty('file');
                    });
                });
            });
        });
    });

    describe('when validate is true', () => {
      it('Should validate links objects properties', () => {
      return leermdLinks(filePath, true)
          .then(links => {
              Promise.all(links).then(res => {
                  res.map(l => {
                  expect(l).toHaveProperty('text');
                  expect(l).toHaveProperty('url');
                  expect(l).toHaveProperty('file');
                  expect(l).toHaveProperty('statusCode');
                  expect(l).toHaveProperty('ok');
                  });
              });
          });
      });
  });
});
