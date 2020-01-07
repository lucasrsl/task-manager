import User from '../models/User';
import JwtBlacklist from '../models/JwtBlacklist';
import authConfig from '../config/auth';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    if(!(await bcrypt.compareSync(password, user.password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const userId = user['_id'];

    const token = await jwt.sign({ userId }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({ user, token });
  }

  async delete(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não informado' });
    }

    const [, token] = authHeader.split(' ');

    JwtBlacklist.create({ token });

    return res.status(200).json({ success: 'Sessão finalizada' });
  }

}

export default new SessionController();