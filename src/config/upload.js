const multer = require('multer');
const path = require('path');



module.exports = {
  storage: multer.diskStorage({
    //dirname informa o diretório atual
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    
    //request, file, callback
    filename: (req, file, cb) => { //arrow functions
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname).replace(/\s+/g, '');

      //`` forma o nome a partir de várias variáveis
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};