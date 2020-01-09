import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// import { getTasksRequest } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* createTask({ payload }) {
    try {
        const { title, description, user, deadLine } = payload;
    
        yield call(api.post, 'task', {
            title, 
            description, 
            user, 
            deadLine
        });
               
        // yield put(getTasksRequest());
        
        history.push('/dashboard'); 
        toast.success('Task criada com sucesso');
    } catch (error) {
        toast.error('Erro ao criar task');
    }   
}


export function* updateTask({ payload }) {
    try {
        const { title, description, user, deadLine, status } = payload;
    
        yield call(api.put, 'task', {
            title, 
            description, 
            user, 
            deadLine,
            status
        });

        // yield put(getTasksRequest());

        toast.success('Task atualizada com sucesso');
    } catch (error) {
        toast.error('Erro ao atualizar task');
    }   
}

export default all([
    // takeLatest('@task/GET_TASKS_REQUEST', getTasks),
    takeLatest('@task/CREATE_TASK_REQUEST', createTask),
    takeLatest('@task/UPDATE_TASK_REQUEST', updateTask)
]);