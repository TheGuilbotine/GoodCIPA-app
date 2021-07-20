// import { LOAD_IPAS, REMOVE_IPA, ADD_IPA } from './items';

// const LOAD = 'ipas/LOAD';
// const ADD_ONE = 'ipas/ADD_ONE';

// const load = list => ({
//   type: LOAD,
//   list,
// });

// const addOneIpa = ipa => ({
//   type: ADD_ONE,
//   ipa,
// });

// export const getIpa = () => async dispatch => {
//   const response = await fetch(`/api/ipas`);

//   if (response.ok) {
//     const list = await response.json();
//     dispatch(load(list));
//   }
// };

// export const getOneIpa = id => async dispatch => {
//   const response = await fetch(`/api/ipas/${id}`);

//   if (response.ok) {
//     const ipa = await response.json();
//     dispatch(addOneIpa(ipa));
//   }
// };

// export const createIpa = payload => async dispatch => {
//   const response = await fetch(`/api/ipas`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   });
//   if (response.ok) {
//     const ipa = await response.json();
//     dispatch(addOneIpa(ipa));
//     return ipa;
//   }
// }

// export const editIpa = (payload) => async dispatch => {
//   const response = await fetch(`/api/ipas/${payload.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   });
//   if (response.ok) {
//     const ipa = await response.json();
//     dispatch(addOneIpa(ipa));
//     return ipa;
//   }
// }

// const initialState = {
//   list: []
// };

// const sortList = (list) => {
//   return list.sort((ipaA, ipaB) => {
//     return ipaA.ipaName - ipaB.ipaName;
//   }).map((ipa) => ipa.id);
// };

// const ipasReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD: {
//       const allIpas = {};
//       action.list.forEach(ipa => {
//         allIpas[ipa.id] = ipa;
//       });
//       return {
//         ...allIpas,
//         ...state,
//         list: sortList(action.list),
//       };
//     }
//     case LOAD_TYPES: {
//       return {
//         ...state,
//         types: action.types,
//       };
//     }
//     case ADD_ONE: {
//       if (!state[action.ipa.id]) {
//         const newState = {
//           ...state,
//           [action.ipa.id]: action.ipa
//         };
//         const ipasList = newState.list.map(id => newState[id]);
//         ipasList.push(action.ipa);
//         newState.list = sortList(ipasList);
//         return newState;
//       }
//       return {
//         ...state,
//         [action.ipa.id]: {
//           ...state[action.ipa.id],
//           ...action.ipa,
//         }
//       };
//     }
//     case LOAD_IPAS: {
//       return {
//         ...state,
//         [action.ipaId]: {
//           ...state[action.ipaId],
//           items: action.items.map(item => item.id),
//         }
//       };
//     }
//     case REMOVE_IPA: {
//       return {
//         ...state,
//         [action.ipaId]: {
//           ...state[action.ipaId],
//           ipas: state[action.ipaId].filter(
//             (ipa) => ipa.id !== action.ipaId
//           ),
//         },
//       };
//     }
//     case ADD_IPA: {
//       console.log(action.item);
//       return {
//         ...state,
//         [action.item.ipaId]: {
//           ...state[action.item.ipaId],
//           items: [...state[action.item.ipaId], action.item.id],
//         },
//       };
//     }
//     default:
//       return state;
//   }
// }

// export default ipasReducer;
