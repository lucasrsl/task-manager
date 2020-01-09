// const INITIAL_STATE = {
//     tasks: {
//         toDo: [],
//         doing: [],
//         done: [],
//         late: [],
//     },
//     loading: true
//  };

// export default function task(state = INITIAL_STATE, action) {
//     switch (action.type) {
//         case '@task/GET_TASKS_REQUEST':
//             return {
//                 ...state,
//                 loading: true
//             }
//         case '@task/GET_TASKS_SUCCESS':
//             return {
//                 ...state,
//                 tasks: action.payload,
//                 loading: false
//             }
//         case '@auth/SIGN_OUT':
//             return {
//                 ...state,
//                 loading: true,
//                 tasks: null
//             }
//         default:
//             return state;
//     }
// }