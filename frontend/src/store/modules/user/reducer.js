const INITIAL_STATE = {
    user: null,
 };

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_SUCCESS':
            return {
                ...state,
                user: action.payload.user
            }
        case '@auth/SIGN_OUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}