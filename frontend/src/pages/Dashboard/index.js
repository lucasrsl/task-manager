import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { signOut } from '../../store/modules/auth/actions';
import { createTaskRequest, updateTaskRequest } from '../../store/modules/task/actions';
import api from '../../services/api';

import { Content, Table, Column, Row } from './styles';

import { store } from '../../store';

export default function Dashboard() {
  const dispatch = useDispatch();

  // const { toDo, doing, done, late } = useSelector(state => state.tasks);
  // const loadingTasks = useSelector(state => state.task.loading);  

  const [tasks, setTasks] = useState({
    toDo: [],
    doing: [],
    done: [],
    late: []
  });

  const [newTask, setNewTask] = {
    title: '',
    description: '',
    deadLine: '',
    status: ''
  }
  
  async function handleInput(event) {
    await setNewTask({
      ...newTask,
      [event.target.name]: event.target.value
    });
    console.log(newTask);
    
  }

  // useEffect(() => {
  //   if(loadingTasks) {
  //     toast.info('Carregando...');
  //   } else {      
  //     toast.dismiss();
  //     toast.success('Pronto!');
  //   }
    
  // }, [loadingTasks]);

  useEffect(() => {
    async function getTasks() {
      const response = await api.get('task');
      const data = response.data
  
      await setTasks({
        ...tasks,
        data
      });
      debugger
      
    }    
    getTasks();
  }, [tasks]);


  function handleSignOut() {
    dispatch(signOut());
  }

  function handleAddTask() {
    dispatch(createTaskRequest(
      newTask.title, 
      newTask.description, 
      store.getState().user.user._id, 
      newTask.deadLine
    ));
  }


  function handleUpdateTask() {
    dispatch(updateTaskRequest(
      newTask.title, 
      newTask.description, 
      store.getState().user.user._id, 
      newTask.deadLine, 
      newTask.status
    ));
  }

  return (
    <Content>
      <button type="button" onClick={ handleSignOut }> 
        <FiLogOut size={36} />
        <span>Sair</span>
      </button>
      <button type="button" onClick={ handleAddTask }> 
        <FiLogOut size={36} />
        <span>Sair</span>
      </button>
      <Table>
        <Column>
          {tasks.toDo.map((task, index) => (
            <Row>
              <p>{index}</p>
            </Row>
          ))}
        </Column>
        <Column>
          {tasks.doing.map((task, index) => (
            <Row>
              <p>{index}</p>
            </Row>
          ))}
        </Column>
        <Column>
          {tasks.done.map((task, index) => (
            <Row>
              <p>{index}</p>
            </Row>
          ))}
        </Column>
        <Column>
          {tasks.late.map((task, index) => (
            <Row>
              <p>{index}</p>
            </Row>
          ))}
        </Column>
      </Table>
    </Content>
  );
}
