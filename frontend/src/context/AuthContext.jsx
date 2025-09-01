import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, admin: null };
    case 'ADMIN_LOGIN_SUCCESS':
      return { ...state, loading: false, admin: action.payload, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else if (admin) {
      dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: admin });
    }
  }, []);

  const login = async (email, password, isAdmin = false) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const endpoint = isAdmin ? '/api/admin/login' : '/api/auth/login';
      const res = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });

      dispatch({
        type: isAdmin ? 'ADMIN_LOGIN_SUCCESS' : 'LOGIN_SUCCESS',
        payload: res.data,
      });

      if (isAdmin) {
        localStorage.setItem('admin', JSON.stringify(res.data));
      } else {
        localStorage.setItem('user', JSON.stringify(res.data));
      }

      return { success: true };
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data));

      return { success: true };
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        admin: state.admin,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
