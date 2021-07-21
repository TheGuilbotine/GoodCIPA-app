import { csrfFetch } from "./csrf";


export const LOAD_IPAS = 'ipas/LOAD_IPAS';
export const REMOVE_IPA = 'ipas/REMOVE_IPA';
export const ADD_ONE = 'ipas/ADD_ONE';

const load = list => ({
  type: LOAD_IPAS,
  list,
});

const addOneIpa = ipa => ({
  type: ADD_ONE,
  ipa,
});

const removeIpa = ipaId => ({
    type: REMOVE_IPA,
    ipaId,
});

export const getIpas = () => async dispatch => {
  const response = await fetch(`/api/ipas`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    // return list;
  }
};

export const getOneIpa = id => async dispatch => {
  const response = await fetch(`/api/ipas/${id}`);

  const ipa = await response.json();
  if (response.ok) {
    dispatch(addOneIpa(ipa));
    // return ipa;
  }
};

export const createIpa = payload => async dispatch => {
  const response = await csrfFetch(`/api/ipas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const ipa = await response.json();
  if (response.ok) {
    dispatch(addOneIpa(ipa));
    return response;
  }
};

export const destroyIpa = id => async dispatch => {
  const response = await csrfFetch(`/api/ipas/${id}`, {
    method: 'DELETE'
  });
  console.log('RESPONSE =====>', response, id)
  if (response.ok) {
    await response.json();
    dispatch(removeIpa(id));
  }
  return response;
};

export const editIpa = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/ipas/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const ipa = await response.json();
        dispatch(addOneIpa(ipa));
      }
      return response;
};

const initialState = {
  list: []
};

const sortList = (ipas) => {

  ipas.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return ipas.map(ipa => ipa.id);
};

const ipasReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_IPAS: {
      const allIpas = {};
      action.list.forEach(ipa => {
        allIpas[ipa.id] = ipa;
      });
      return {
        ...allIpas,
        ...state,
        list: sortList(action.list),
      };
    }
    case ADD_ONE: {
      if (!state[action.ipa.id]) {
        const newState = {
          ...state,
          [action.ipa.id]: action.ipa
        };
        const ipasList = newState.list.map(id => newState[id]);
        ipasList.push(action.ipa);
        newState.list = sortList(ipasList);
        return newState;
      }
      return {
        ...state,
        [action.ipa.id]: {
          ...state[action.ipa.id],
          ...action.ipa,
        }
      };
    }
    case REMOVE_IPA: {
        const newState = {
            ...state
        };
        const ipaList = newState.list.filter(ipaId => ipaId !== action.ipaId);
        newState.list = ipaList;
        delete newState[action.ipaId];

        return newState;
    }
    default:
      return state;
  }
}

export default ipasReducer;
