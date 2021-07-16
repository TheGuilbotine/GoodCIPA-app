import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(setUser(data.user));
    }

    return response;
};


// THUNKS
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(setUser(data.user));
    }
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

// Initial State
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
          const newState = { ...state, user: action.user };
          return newState;
        case REMOVE_USER:
          return { ...state, user: null };
        default:
          return state;
      }
    // let newState;
    // switch (action.type) {
    //     case SET_USER:
    //         newState = Object.assign({}, state);
    //         newState.user = action.payload;
    //         return newState;
    //     case REMOVE_USER:
    //         newState = Object.assign({}, state);
    //         newState.user = null;
    //         return newState;
    //     default:
    //         return state;
    // }
};


export default sessionReducer;