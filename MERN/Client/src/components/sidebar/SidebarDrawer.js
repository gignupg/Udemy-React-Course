import React, { useState, useEffect, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectContext from '../../context/projects/ProjectContext';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const SidebarDrawer = () => {
    const classes = useStyles();

    const [inputValue, setInputValue] = useState("")

    const { 
        projects, 
        inputError, 
        showInputField, 
        inputErrorUpdater, 
        newProjectCreator, 
        inputFieldActivator,
        projectSynchronizer,
        activeProjectUpdater
    } = useContext(ProjectContext);

    useEffect(() => {
        projectSynchronizer();
        // eslint-disable-next-line
    }, []);

    // Puts the cursor into the input field, so you can start typing
    useEffect(() => {
        if (showInputField) {
            document.getElementById("project-input-field").focus();
        }
    }, [showInputField]);

    const projectSubmitHandler = async e => {
        e.preventDefault();

        if (!inputValue) {
            inputErrorUpdater("The project name cannot be left empty");

        } else if (projects.some(project => project.name.toLowerCase() === inputValue.toLowerCase())) {
            inputErrorUpdater("A project with this name already exists");

        } else {
            newProjectCreator(inputValue)
        }
    };

    return (
        <div>
            <Box
                className={classes.toolbar}
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Typography
                    color="primary"
                    variant="h5">
                    <span
                        style={{ fontWeight: "bold" }}
                    >
                        Task&nbsp;
                    </span>
                    Manager
                </Typography>
            </Box>
            <Divider />
            <Button
                onClick={() => inputFieldActivator(true)}
                className="mx-auto mt-4 d-block col-10"
                size="large"
                variant="contained"
                color="primary"
            >
                New Project
            </Button>
            {showInputField &&
                <form onSubmit={projectSubmitHandler}>
                    <TextField
                        id="project-input-field"
                        onChange={e => setInputValue(e.target.value)}
                        size="small"
                        className="mx-auto mt-5 d-block col-10"
                        label="Project name"
                        variant="outlined"
                    >
                    </TextField>
                    <Button
                        type="submit"
                        className="mx-auto mt-2 d-block col-10"
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        Add this Project
                    </Button>
                </form>
            }
            {inputError &&
                <Typography
                    className="mt-2 mx-4"
                    color="error"
                >
                    {inputError}
                </Typography>
            }
            <Typography
                className="mt-5 mb-3"
                align="center"
                variant="h6"
                color="primary"
            >
                Your projects
            </Typography>
            <TransitionGroup>
                {projects && projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                    >
                        <Button
                            onClick={() => activeProjectUpdater(project)}
                            color="primary"
                            className="mb-2 mx-auto d-block text-left col-10"
                        >
                            {project.name}
                        </Button>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default SidebarDrawer;