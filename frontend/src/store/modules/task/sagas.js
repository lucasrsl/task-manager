import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getTasksSuccess } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* getTasks() {
    const response = yield call(api.get, 'task');
    
    const { toDo, doing, done, late } = response.data;

    yield put(getTasksSuccess(toDo, doing, done, late));
       
}

export function* createTask({ payload }) {
    try {
        const { title, description, user, deadLine } = payload;
    
        const response = yield call(api.post, 'task', {
            title, 
            description, 
            user, 
            deadLine
        });
               
        console.log(response);
        
        history.push('/dashboard'); 
        toast.success('Task criada com sucesso');
    } catch (error) {
        toast.error('Erro ao criar task');
    }   
}


export function* updateTask({ payload }) {
    try {
        const { title, description, user, deadLine, status } = payload;
    
        const response = yield call(api.put, 'task', {
            title, 
            description, 
            user, 
            deadLine,
            status
        });
                
        console.log(response);

        toast.success('Task atualizada com sucesso');
    } catch (error) {
        toast.error('Erro ao atualizar task');
    }   
}

export default all([
    takeLatest('@auth/GET_TASKS_REQUEST', getTasks),
    takeLatest('@auth/CREATE_TASK_REQUEST', createTask),
    takeLatest('@auth/UPDATE_TASK_REQUEST', updateTask)
]);