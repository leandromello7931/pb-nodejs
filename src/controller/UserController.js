const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  async login(req, res, next){
    const { login, password} = req.body;
    const user = await User.findOne({where: {login : login}})
    if (!user){
      return res.status(401).send({error: 'User not authorized'});
    }
    const authorized = await bcrypt.compare(password, user.password);
    const _id = user.id;
    if(authorized){ //password match 
      const token = jwt.sign({_id}, process.env.SECRET, { //generate token with user.id
        expiresIn: "2 days"
      });
      return res.json({auth: true, token: token});
    }  
    return res.status(401).send({error: 'User not authorized'});
    
  },

  async store(req, res, next){
    const {
      name,
      login,
      password,
    } = req.body;
    
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