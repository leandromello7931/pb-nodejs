const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res){
    const { login, password} = req.body;
    const user = await User.findOne({where: {login : login}})
    const authorized = await bcrypt.compare(password, user.password);
    const _id = user.id;
    if(authorized){
      const token = jwt.sign({_id}, process.env.SECRET, {
        expiresIn: 500
      });
      return res.json({auth: true, token: token});
    }
    return res.status(401);
  },

  async store(req, res, next){
    const {
      name,
      login,
      password,
    } = req.body;

    console.log(req);
    
    const saltRounds = 10;

    try{

      const hashPass = await bcrypt.hash(password, saltRounds);
      const user = await User.create({name, login, password: hashPass});

      if(!user){
        return res.status(409).send({error: 'Error'});
      }
      next();

      return res.json(user);

    }catch(err){
      next(err);
      return res.status(500).send({error: "An error has ocurred, please try again"});
    } 
  },

  async delete(req, res, next){

  },

  async put(req, res, netx){

  }
}