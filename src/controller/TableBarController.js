const TablesBar = require('../models/TableBar');

module.exports = {

  async store(req, res){
    try{
      const {
        identification,
        observation
      } = req.body;

      const tableBar = await TablesBar.create({ identification, observation });
      if (!tableBar){
        return res.status(400).send({error: 'Something went very wrong'});
      }else{
        return res.status(200).send({message: 'OK'});
      }
    }catch(err){
      return res.status(500).send({error: 'Internal Server Error'});
    }

  }
}