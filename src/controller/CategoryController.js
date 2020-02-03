const Category = require('../models/Category');

module.exports = {
  async index(req, res, next){
    try {
      const categories = await Category.findAll();
      if(!categories.length > 0){
        return res.json({message: "Nenhuma categoria encontrada"})
      }else{
        return res.json(categories);
      }
      return res.json(categories);
    } catch (error) {
      console.log(error);
      return res.json({message: "Ops"});
    }

  },

  async store(req, res, next){
    const { 
      name, 
      active 
    } = req.body; 
    
    try{
      const category = await Category.create({ name, active });
      // if(!category){
      //   return res.status(409).send({error: "An error has ocurred, please check the message and try again"});
      // }
      next();
      //return res.json(category);
      return res.status(200).send({error: "OK"});

    }catch(err){
      next(err);
      return res.status(500).send({error: "Internal server error"});
    }

  }
}