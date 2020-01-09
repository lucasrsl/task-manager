export function createTaskRequest(title, description, user, deadLine) {
    return {
        type: '@task/CREATE_TASK_REQUEST',
        payload: { title, description, user, deadLine }
    };
}

export function updateTaskRequest(title, description, user, deadLine, status) {
    return {
        type: '@task/UPDATE_TASK_REQUEST',
        payload: { title, description, user, deadLine }
    };
}
