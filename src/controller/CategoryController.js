const connection = require('../database/connection');

module.exports = {
  async index(req, res, next){
    try {
      const categories = await connection('categories')
      .select('*');

      if(!categories.length > 0){
        return res.json({message: "Nenhuma categoria encontrada"})
      }else{
        return res.json(categories);
      }
    } catch (error) {
      return res.json({message: "Ops"});
    }

  },

  async store(req, res, next){
    const { 
      name, 
      active 
    } = req.body; 
    
    try{
      const { filename } = req.file;
      const [category] = await connection('categories')
      .returning('id')
      .insert({ name, active, image: filename });

      if(!category){
        return res.status(409).send({error: "An error has ocurred, please check the message and try again"});
      }
      //return res.json(category);
      return res.status(200).send({category});

    }catch(err){
      return res.status(500).send({error: "Internal server error"});
    }
  },

  async update(req, res, next){
    const { id } = req.params;
    const {
      name,
      active
    } = req.body;
    const { filename } = req.file;
    try{
  
      const [category] = await connection('categories')
      .where({id: id})
      .update({
          name: name,
          active: true,
          image: filename,
          updated_at: new Date()
        }, ['id']);
      if(!category){
        return res.status(409).send({error: "An error has ocurred, please check the message and try again"});
      }else{
        return res.status(200).send(category);
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({error: "Internal server error"});
    }
  },

  async delete(req, res, next){
    const { id } = req.params;
    const rowsDeleted = await connection('categories')
    .where({
        id: id
    }).del();
    if(rowsDeleted !== 0){
      return res.status(200).send({message: "Recorde deleted"});
    }else{
      return res.status(409).send({error: "Something bad happened"});
    }

    
  }
}