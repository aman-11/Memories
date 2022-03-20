import { AUTH } from '../constants/actionType.js';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        console.log("callimng api")
        const { data } = await api.signIn(formData);
        console.log("dispatch to server")
        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log("here are we");
        console.log(error);
    }
}

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};