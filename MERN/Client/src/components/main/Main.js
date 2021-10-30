import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ProjectContext from '../../context/projects/ProjectContext';
import ProjectPage from './ProjectPage';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[100],
    },
}));

const Main = () => {
    const classes = useStyles();

    const { activeProject } = useContext(ProjectContext);

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            {activeProject._id ?
                // When a project is selected 
                <ProjectPage />        
            :
                // When no project is selected
                <Typography  
                    className="mt-5"    
                    align="center" 
                    color="primary" 
                    variant="h5" 
                >
                    <strong>Select a project from the left sidebar!</strong>
                </Typography>
            }
        </div>
    );
};

export default Main;