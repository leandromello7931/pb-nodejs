const Table = require('../models/Table');
const Order = require('../models/Order');
module.exports = {
  async index(req, res){
    try{
      const tables = await Table.findAll({include: [ Order ]});
      if(!tables){
        return res.status(400).send({ error: 'OPS'});
      }
      return res.status(200).send(tables);
    }catch(err){
      return res.status(500).send({ err});
    }
  },

  async store(req, res){
    try{
      const {
        identification,
        observation
      } = req.body;

      const table = await Table.create({ identification, observation });
      if (!table){
        return res.status(400).send({error: 'Something went very wrong'});
      }else{
        return res.status(200).send({message: 'OK'});
      }
    }catch(err){
      return res.status(500).send({error: 'Internal Server Error'});
    }

  }
}