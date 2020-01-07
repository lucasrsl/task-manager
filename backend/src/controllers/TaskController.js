import Task from '../models/Task';
import * as Yup from 'yup';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      user: Yup.string().required(),
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
      status: 'todo',
      deadLine,
      deletedAt: null,
    });

    return res.json(task);
  }

  async index(req, res) {

    const userTasksToDo = await Task.find({ 
      user: req.userId, 
      status: 'todo', 
      deletedAt: null 
    });

    const userTasksGoing = await Task.find({ 
      user: req.userId, 
      status: 'doing',
      deletedAt: null 
    });

    const userTasksDone = await Task.find({ 
      user: req.userId, 
      status: 'done', 
      deletedAt: null 
    });

    const userTasksLate = await Task.find({ 
      user: req.userId, 
      status: 'late', 
      deletedAt: null 
    });

    const userTasks = {
      toDo: userTasksToDo,
      doing: userTasksGoing,
      done: userTasksDone,
      late: userTasksLate,
    }

    return res.json(userTasks);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      taskId: Yup.string().required(),
    });    

    if(!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Id da tarefa não informado' });
    }

    const { taskId } = req.params
    const { title, description, deadLine, user, status } = req.body;
    

    await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      deadLine,
      user,
      status,
    });

    const task = await Task.findById(taskId);
  
    return res.json(task);

  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      taskId: Yup.string().required(),
    });

    if(!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Id da tarefa não informado' });
    }

    const { taskId } = req.params
    
    await Task.findByIdAndUpdate(taskId, {
      deletedAt: new Date(),
    });

    return res.status(200).json({ success: 'Tarefa deletada com sucesso' });
  }
}

export default new TaskController();