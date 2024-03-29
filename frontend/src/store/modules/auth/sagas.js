import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;
    
        const response = yield call(api.post, 'session', {
            email,
            password
        });
        
        const { token, user } = response.data;
    
        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
    
        history.push('/dashboard'); 
    } catch (error) {
        toast.error('Erro ao logar, verifique seus dados');
        yield put(signFailure());
    }   
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;
    
        yield call(api.post, 'user', {
            name,
            email,
            password
        });
                
        history.push('/'); 
        toast.success('Usuário cadastrado com sucesso');
    } catch (error) {
        toast.error('Erro ao cadastrar, verifique seus dados');
        yield put(signFailure());
    }   
}

export function setToken({ payload }) {
    if(!payload) return;

    const { token } = payload.auth;

    if(token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)
]);