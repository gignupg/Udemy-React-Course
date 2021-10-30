import React, { useEffect, useContext } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import TaskContext from '../../context/tasks/TaskContext';
import ProjectContext from '../../context/projects/ProjectContext';

const Tasks = () => {
    const { activeProject } = useContext(ProjectContext);

    const {
        tasks,
        editModeActivator,
        statusSwitcher,
        taskDeleter,
        taskSynchronizer
    } = useContext(TaskContext);

    useEffect(() => {
        taskSynchronizer(activeProject._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject]);

    return (
        <>
            {tasks.length === 0
                ?
                (
                    <Paper
                        elevation={3}
                        className="mx-auto p-0 col-10 col-sm-8 col-lg-6"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-lg-5 my-auto px-0">
                                    <Typography
                                        className="m-1 ml-2"
                                    ><strong>There are no tasks</strong></Typography>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
                :
                <>
                    {tasks.map(task => (
                        <Paper
                            key={task._id}
                            elevation={3}
                            className="mx-auto mb-3 p-2 col-10 col-sm-8 col-lg-6"
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-lg-5 my-auto px-0">
                                        <Typography
                                            className="m-1 align-task-title"
                                        ><strong>{task.name}</strong></Typography>
                                    </div>
                                    <div className="col m-auto px-0">
                                        <Typography
                                            onClick={() => statusSwitcher(task._id, task.status)}
                                            align="center"
                                            className={`m-1 ${task.status}`}
                                            variant="body2"
                                            style={{ borderRadius: "4px", cursor: "pointer" }}
                                        >
                                            {task.status}
                                        </Typography>
                                    </div>
                                    <Button
                                        onClick={() => editModeActivator(task)}
                                        className="col m-auto"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        onClick={() => taskDeleter(task._id)}
                                        className="col m-auto"
                                        size="small"
                                        variant="contained"
                                    >
                                        delete
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </>
            }
        </>
    );
};

export default Tasks;