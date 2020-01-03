import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController {
  async login(req, res) {
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

    this.comparePassword(password, user.password, (error, match) => {
      if(!match) {
        return res.status(400).json({ error: 'Senha incorreta' });
      }
    });

    const userId = user['_id'];
    const token = await jwt.sign({ userId }, 1);

    return res.status(200).json({ user, token });
  }

  comparePassword(plaintext, password, callback) {
    return callback(null, bcrypt.compareSync(plaintext, password));
  }
}

export default new SessionController();