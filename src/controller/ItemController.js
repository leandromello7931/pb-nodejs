const Items = require('../models/Items');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)

module.exports = {
  async index(req, res){

  },

  async store(req, res){
    try{
      const {
        title,
        description,
        price
      } = req.body;
      const imageUpload = req.file.path;
      const item = await Items.create({title, description, price, image : imageUpload });
      if (!item ){
        res.status(409).send({ error: "Something went very wrong" });
      }else{
        res.status(200).send({ message: "OK" });
        unlinkAsync(imageUpload);
      }
    }catch(err){
      res.status(500).send({ error: "OOOOOPS"});
    }
  }
}