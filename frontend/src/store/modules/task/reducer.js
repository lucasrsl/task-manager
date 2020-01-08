const INITIAL_STATE = {
    tasks: null,
    loading: false
 };

export default function task(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@task/GET_TASKS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case '@task/GET_TASKS_SUCCESS':
            const toDo = action.payload.toDo;
            const doing = action.payload.doing;
            const done = action.payload.done;
            const late = action.payload.late;
            return {
                ...state,
                tasks: { 
                    toDo, 
                    doing, 
                    done, 
                    late 
                },
                loading: false
            }
        default:
            return state;
    }
}