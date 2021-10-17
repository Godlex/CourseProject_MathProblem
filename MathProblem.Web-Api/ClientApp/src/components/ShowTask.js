import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import authService from "./api-authorization/AuthorizeService";
import {Translation} from "../translations/translation";
import {Box, Paper, Rating} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

export function ShowTask() {

    let {id} = useParams();

    const [task, setTask] = useState([])

    useEffect(() => {

        const fetchTask = async () => {

            const token = authService.getAccessToken();

            const response = await fetch("api/MathProblem/" + id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json();

            setTask([data])
        };
        fetchTask();
    }, [setTask]);

    return (
        <Box>
            <h1>
                <Translation text={"text_task"}/> {task.map(value => value.name)} <Rating name="read-only"
                                                                                          value={task.map(value => value.rating)}
                                                                                          precision={0.5} readOnly/>
            </h1>
            <Paper>
                <Translation text={"text_condition"}/>
                <MDEditor.Markdown source={"" + task.map(value => value.taskCondition)}/>
            </Paper>
            <Box>
                <Translation text={"text_tags"}/>{task.map(value => value.tags)}
            </Box>
        </Box>
    );
}