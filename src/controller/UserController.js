const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async store(req, res){
    const {
      name,
      login,
      password,
    } = req.body;

    const hashPass = bcrypt.hashSync(password);
      const user = await User.create({name, login, hashPass}).
      catch((err) => {
        console.log(err);
      });
    
    return res.json(user);
  }
}