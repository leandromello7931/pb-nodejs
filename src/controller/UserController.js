const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async store(req, res){
    const {
      name,
      login,
      password = bcrypt.hashSync(req.password, 10),
    } = req.body;
      const user = await User.create({name, login, password}).catch((err) => {console.log(err)});
    
    return res.json(user);
  }
}