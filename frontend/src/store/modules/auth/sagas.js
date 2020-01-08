import { takeLatest, all, call, put } from 'redux-saga/effects';

import { signInSuccess } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn({ payload }) {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
        email,
        password
    });
    
    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');    
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn)
]);