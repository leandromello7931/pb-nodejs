const Order = require('../models/Order');
const Table = require('../models/Table')

module.exports = {

  async store(req, res){

    const { table_id } = req.params;
    const { total, status } = req.body;
    try{
      const table = await Table.findByPk(table_id);
      if(!table){
        return res.status(400).send({error: 'table not found'});

      }
      const order = Order.create({ total, status, table_id });
      return res.status(200).send({ message: 'OK'});
    }catch(err){
      return res.status(500).send({ error: 'Something went very wrong'});
    }
  }
}