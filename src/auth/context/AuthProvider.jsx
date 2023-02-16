
import { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

export const AuthProvider = ({ children }) => {


    const init = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            logged: !!user,
            user
        }
    }

    const [state, dispatch] = useReducer(authReducer, {}, init )
    const onLogin = (name = '') => {

        const user = {id: 123, name: 'Andres Piedra'}
        const action = {
            type: types.login,
            payload: user,
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action)
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        const action = {
            type: types.logout,
        }
        dispatch(action)
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            login: onLogin,
            logout: onLogout,
        }}>
            {children}
        </ AuthContext.Provider>
    );
}
