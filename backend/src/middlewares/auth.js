import jwt from 'jsonwebtoken';

import JwtBlacklist from '../models/JwtBlacklist';

import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  const jwtBlacklisted = JwtBlacklist.findOne({token});

  if(jwtBlacklisted) {
    return res.status(401).json({ error: 'Sessão inválida' });
  }

  try {

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.userId;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
