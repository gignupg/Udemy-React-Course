import React, { useReducer } from 'react';
import projectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import axiosClient from '../../config/axios';

const ProjectState = props => {
    const initialState = {
        projects: [],
        activeProject: {},
        showInputField: false,
        inputError: "",
    }

    const [state, dispatch] = useReducer(ProjectReducer, initialState)

    const projectDeleter = async projectId => {
        await axiosClient.delete(`/api/projects/${projectId}`)
        dispatch({type: "DELETE_PROJECT", payload: projectId})
    }

    const inputErrorUpdater = errorMessage => {
        dispatch({ type: "UPDATE_INPUT_ERROR", payload: errorMessage })
    }

    const newProjectCreator = async projectName => {
        const response = await axiosClient.post('/api/projects', { name: projectName });
        dispatch({ type: "CREATE_NEW_PROJECT", payload: response.data })
    }

    const inputFieldActivator = value => {
        dispatch({ type: "TOGGLE_INPUT_FIELD", payload: value })
    }

    const activeProjectUpdater = newActiveProject => {
        dispatch({ type: "UPDATE_ACTIVE_PROJECT", payload: newActiveProject })
    }

    const projectSynchronizer = async () => {
        try {
            const response = await axiosClient.get('/api/projects');
            dispatch({ type: "SYNCHRONIZE_PROJECTS", payload: response.data.projects });
        } catch (error) {
            console.log("User not authenticated!", error);
        }
    };

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                activeProject: state.activeProject,
                showInputField: state.showInputField,
                inputError: state.inputError,
                projectDeleter,
                projectSynchronizer,
                inputErrorUpdater,
                newProjectCreator,
                inputFieldActivator,
                activeProjectUpdater,
            }}
        > 
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;