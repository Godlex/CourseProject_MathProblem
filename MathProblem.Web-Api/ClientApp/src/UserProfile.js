import React, {Component} from "react";
import authService from "./components/api-authorization/AuthorizeService";
import {Box, Paper, Rating, Typography} from "@mui/material";
import {Translation} from "./translations/translation";
import {Tasks} from "./components/Tasks";


export class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            userId: null,
            rightAnswerCount: null,
            taskCreatedCount: null,
            averageTaskRating: 0,
        };
    }

    componentDidMount() {
        this.populateState();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        const token = authService.getAccessToken();
        const response = await fetch("api/UserProfile/" + user.sub,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )

        const data = await response.json();

        this.setState({
            isAuthenticated,
            userName: user && user.name,
            userId: user && user.sub,
            rightAnswerCount: data.rightAnswerCount,
            taskCreatedCount: data.taskCreatedCount,
            averageTaskRating: data.averageTaskRating
        });
    }


    render() {
        const {userName, userId, rightAnswerCount, taskCreatedCount, averageTaskRating} = this.state;

        return (
            <Box>
                <Paper elevation={3}>
                    <Typography sx={{
                        display: 'flex',
                    }}>
                        <h1>
                            {userName}
                        </h1>
                        <Rating name="read-only" value={averageTaskRating} precision={0.5} readOnly/>
                        <Typography>
                            ({averageTaskRating})
                        </Typography>
                    </Typography>
                    <Typography>
                        <Translation text={"text_created_task"}/> - {taskCreatedCount}
                    </Typography>
                </Paper>
                <Tasks userId={userId} taskCreatedCount={taskCreatedCount}/>
            </Box>
        );
    }
}