export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_TASK":
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskInput: "",
                activeTask: {},
                inputError: ""
            };
        case "ACTIVATE_EDIT_MODE":
            return {
                ...state,
                activeTask: action.payload,
                taskInput: action.payload.name,
                submitButtonName: "Change task name"
            };
        case "UPDATE_INPUT_ERROR":
            return {
                ...state,
                inputError: action.payload
            };
        case "UPDATE_TASKS":
            return {
                ...state,
                tasks: action.payload
            };
        case "UPDATE_TASK_NAME":
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
                submitButtonName: "Add a task",
                taskInput: "",
                activeTask: {},
                inputError: ""
            };
        case "UPDATE_TASK_STATUS":
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            };
        case "UPDATE_TASK_INPUT":
            return {
                ...state,
                taskInput: action.payload
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id === action.payload ? null : task)
            };
        default:
            return state;
    }
}