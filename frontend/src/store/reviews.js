import { csrfFetch } from "./csrf";


export const LOAD_COS = 'cos/LOAD_COS';
export const REMOVE_CO = 'cos/REMOVE_CO';
export const ADD_ONE = 'cos/ADD_ONE';

const load = list => ({
  type: LOAD_COS,
  list,
});

const addOneCO = co => ({
  type: ADD_ONE,
  co,
});

const removeCO = coId => ({
    type: REMOVE_CO,
    coId,
});

export const getCOs = () => async dispatch => {
  const response = await fetch(`/api/cracked-open`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    // return list;
  }
};

export const getOneCO = id => async dispatch => {
  const response = await fetch(`/api/cracked-open/${id}`);

  if (response.ok) {
    const co = await response.json();
    dispatch(addOneCO(co));
  }
};

export const createCO = payload => async dispatch => {
  const response = await csrfFetch(`/api/cracked-open`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const co = await response.json();
    dispatch(addOneCO(co));
    return co;
  }
};

export const destroyCO = id => async dispatch => {
  const response = await csrfFetch(`/api/cracked-open/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    await response.json();
    dispatch(removeCO(id));
  }
  return response;
};

export const editCO = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/cracked-open/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const co = await response.json();
        dispatch(addOneCO(co));
        return co;
      }
};

const initialState = {
  list: []
};

const sortList = (cos) => {

    cos.sort((a, b) => {
      return b.id - a.id
    });

    return cos.map(co => +co.id);
  };

const cosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COS: {
      const allCOs = {};
      action.list.forEach(co => {
        allCOs[co.id] = co;
      });
      return {
        ...allCOs,
        ...state,
        list: sortList(action.list),
      };
    }
    case ADD_ONE: {
      if (!state[action.co.id]) {
        const newState = {
          ...state,
          [action.co.id]: action.co
        };
        const cosList = newState.list.map(id => newState[id]);
        cosList.push(action.co);
        newState.list = sortList(cosList);
        return newState;
      }
      return {
        ...state,
        [action.co.id]: {
          ...state[action.co.id],
          ...action.co,
        }
      };
    }
    case REMOVE_CO: {
        const newState = {
            ...state
        };
        const coList = newState.list.filter(coId => coId !== action.coId);
        newState.list = coList;
        delete newState[action.coId];

        return newState;
    }
    default:
      return state;
  }
}

export default cosReducer;
