import User from './models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    
    const userExists = User.
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export default new UserController();