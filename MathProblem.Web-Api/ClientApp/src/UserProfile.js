import React, {Component} from "react";
import authService from "./components/api-authorization/AuthorizeService";
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Rating, Typography} from "@mui/material";


export class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this.populateState();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name,
        });
    }


    setValue(newValue, value) {

    }

    render() {
        let {userName, value} = this.state;
        value = 4;
        return (
            <Box>
                <Paper elevation={3}>
                    <Typography sx={{
                        display: 'flex',
                    }}>
                        <h1>
                            {userName}
                        </h1>
                        <Rating name="read-only" value={value} precision={0.5} readOnly/>
                        <Typography>
                            ({value})
                        </Typography>
                    </Typography>
                </Paper>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Task 1<Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                this.setValue(newValue, value);

                            }
                            }

                        /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Task Text
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }
}