const jwt = require('jsonwebtoken');
const HTTPstatus = require('http-status');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: 86400 });
};

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(HTTPstatus.FORBIDDEN).json({
      message: 'Acesso Restrito',
    });
  }

  return jwt.verify(token, global.SALT_KEY, (error) => {
    if (error) {
      return res.status(HTTPstatus.FORBIDDEN).json({
        message: 'Token Inválido',
      });
    }
    return next();
  });
};

exports.isAdmin = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(HTTPstatus.FORBIDDEN).json({
      message: 'Acesso Restrito',
    });
  }

  return jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) {
      return res.status(HTTPstatus.FORBIDDEN).json({
        message: 'Token Inválido',
      });
    }

    if (decoded.roles.includes('admin')) {
      return next();
    }

    return res.status(HTTPstatus.UNAUTHORIZED).json({
      message: 'Esta funcionalidade é restrita para administradores',
    });
  });
};
