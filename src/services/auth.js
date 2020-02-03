const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'].split(" ")[1];
  console.log(token);
  if(!token){
    return res.status(401).send({auth: false, message: 'User not authenticated 1.'});
  }
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err){
      console.log(err);
      return res.status(401).send({auth: false, message: 'User not authenticated 2.'});
    }
    req.userId = decoded.id;
    next();
  })
}

module.exports.verifyJWT = verifyJWT;