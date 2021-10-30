import React, { useReducer } from 'react';
import taskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import axiosClient from '../../config/axios';

const TaskState = props => {
    const initialState = {
        tasks: [],
        taskInput: "",
        activeTask: {},
        submitButtonName: "Add a task",
        inputError: ""
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const inputErrorUpdater = msg => {
        dispatch({ type: "UPDATE_INPUT_ERROR", payload: msg });
    };

    const newTaskCreator = async (taskName, activeProject) => {
        try {
            const response = await axiosClient.post('/api/tasks', { name: taskName, projectId: activeProject });
            dispatch({ type: "CREATE_NEW_TASK", payload: response.data });

        } catch (err) {
            console.log(err);
        }
    };

    const editModeActivator = async task => {
        window.scrollTo(0, 0);
        document.getElementById("task-input-field").focus();
        dispatch({ type: "ACTIVATE_EDIT_MODE", payload: task });
    };

    const statusSwitcher = async (taskId, taskStatus) => {
        try {
            const response = await axiosClient.patch(`/api/tasks/${taskId}`, { oldStatus: taskStatus });
            dispatch({ type: "UPDATE_TASK_STATUS", payload: response.data });

        } catch (error) {
            console.log("User not authenticated!", error);
        }

    };

    const tasksUpdater = activeProject => {
        dispatch({ type: "UPDATE_ACTIVE_TASKS", payload: activeProject });
    };

    const taskNameUpdater = async inputFieldValue => {
        try {
            const response = await axiosClient.patch(`/api/tasks/${state.activeTask._id}`, { newName: inputFieldValue });
            dispatch({ type: "UPDATE_TASK_NAME", payload: response.data });
        } catch (error) {
            console.log("User not authenticated!", error);
        }
    };

    const taskDeleter = async taskId => {
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`);
            dispatch({ type: "DELETE_TASK", payload: taskId });

        } catch (error) {
            console.log("User not authenticated!", error);
        }
    };

    const taskInputUpdater = input => {
        dispatch({ type: "UPDATE_TASK_INPUT", payload: input });
    };

    const taskSynchronizer = async projectId => {
        try {
            const response = await axiosClient.get(`/api/tasks/${projectId}`);
            dispatch({ type: "UPDATE_TASKS", payload: response.data.tasks });

        } catch (error) {
            console.log("User not authenticated!", error);
        }
    };

    return (
        <taskContext.Provider
            value={{
                tasks: state.tasks,
                taskInput: state.taskInput,
                activeTask: state.activeTask,
                submitButtonName: state.submitButtonName,
                inputError: state.inputError,
                inputErrorUpdater,
                newTaskCreator,
                editModeActivator,
                statusSwitcher,
                tasksUpdater,
                taskDeleter,
                taskInputUpdater,
                taskSynchronizer,
                taskNameUpdater
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;