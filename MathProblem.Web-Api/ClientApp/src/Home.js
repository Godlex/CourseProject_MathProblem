import React, {useState} from 'react';
import {Paper, Rating} from "@mui/material";
import {Translation} from "./translations/translation";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export function Home() {

    let [page, setPage] = useState(0);
    const [tasks, setTasks] = useState([]);


    const fetchAllTask = async () => {

        const response = await fetch("api/MathProblem?page=" + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json();

        setTasks([...tasks, ...data.postTasks]);

        setPage(++page)
    };

    return (
        <InfiniteScroll
            dataLength={tasks.length}
            next={fetchAllTask}
            loader={<h4>Loading...</h4>}
            hasMore
            endMessage={
                <p style={{textAlign: "center"}}>
                    <b><Translation text={"text_it_all"}/></b>
                </p>
            }
        >
            <div>
                {tasks.map(value => (
                    <Paper elevation={3}>
                        <Translation text={"text_task"}/>{value.name} <Rating name="read-only"
                                                                              value={value.rating}
                                                                              precision={0.5} readOnly/>
                        <div><Translation text={"text_tags"}/>{value.tags}</div>
                        <Link underline="hover" to={"/task/" + value.postTaskId}><Translation text={"text_view_more"}/></Link>
                    </Paper>))}
            </div>
        </InfiniteScroll>
    );
}