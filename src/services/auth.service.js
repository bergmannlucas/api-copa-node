'use strict';

const jwt = require('jsonwebtoken');
const HTTPstatus = require('http-status');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: 86400 });
}

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY);
  return data;
}

exports.authorize = function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(HTTPstatus.FORBIDDEN).json({
      message: 'Acesso Restrito'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        return res.status(HTTPstatus.FORBIDDEN).json({
          message: 'Token Inválido'
        });
      } else {
        return next();
      }
    });
  }
}

exports.isAdmin = function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(HTTPstatus.FORBIDDEN).json({
      message: 'Acesso Restrito'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        return res.status(HTTPstatus.FORBIDDEN).json({
          message: 'Token Inválido'
        });
      } else {
        if (decoded.roles.includes('admin')) {
          return next();
        } else {
          return res.status(HTTPstatus.UNAUTHORIZED).json({
            message: 'Esta funcionalidade é restrita para administradores'
          });
        }
      }
    });
  }
}
