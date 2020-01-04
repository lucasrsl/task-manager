import User from '../models/User';
import authConfig from '../config/auth';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController {
  async login(req, res) {

    // Objeto schema de validação utilizando Yup
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    // Verifica se os campos da requisição estão válidos
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Verifica, a partir do email, se o usuário já existe
    if(!user) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    // Verifica se a senha está correta
    if(!(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const userId = user['_id'];

    // Gera um token de autenticação, a partir da chave e data de expiração
    const token = await jwt.sign({ userId }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({ user, token });
  }

}

export default new SessionController();