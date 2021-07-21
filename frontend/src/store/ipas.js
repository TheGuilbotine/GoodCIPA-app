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

  if (response.ok) {
    const ipa = await response.json();
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
  if (response.ok) {
    const ipa = await response.json();
    dispatch(addOneIpa(ipa));
    return ipa;
  }
};
export const destroyIpa = id => async dispatch => {
  const response = await csrfFetch(`/api/ipas/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const ipa = await response.json();
    dispatch(removeIpa(id));
    return ipa;
  }
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
        return ipa;
      }
};

const initialState = {
  list: []
};

const sortList = (list) => {
  return list.sort((ipaA, ipaB) => {
    return ipaA.ipaName - ipaB.ipaName;  //TODO check that this works
  }).map((ipa) => ipa.id);
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
