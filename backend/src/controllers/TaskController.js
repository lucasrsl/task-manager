import Task from './models/Task';
import * as Yup from 'yup';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      user: Yup.number().required(),
      deadLine: Yup.date().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const { title, description, user, deadLine } = req.body;


    const task = await Task.create({
      title,
      description,
      user,
      deadLine
    });

    return res.json(task);
  }
}

export default new TaskController();