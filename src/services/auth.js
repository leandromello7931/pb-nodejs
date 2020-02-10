const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'].split(" ")[1];
  
  if(!token){
    return res.status(401).send({auth: false, message: 'User not authenticated'});
  }
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err){
      return res.status(401).send({auth: false, message: 'User not authenticated'});
    }
    req.userId = decoded.id;
    next();
  })
}

module.exports.verifyJWT = verifyJWT;