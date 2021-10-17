import InfiniteScroll from "react-infinite-scroll-component";
import React, {useState} from "react";
import authService from "./api-authorization/AuthorizeService";
import {Paper, Rating} from "@mui/material";
import {Translation} from "../translations/translation";
import {Link} from "react-router-dom";


export function Tasks({userId, taskCreatedCount}) {

    let [hasMore, setHasMore] = useState(true);
    let [page, setPage] = useState(0);
    const [tasks, setTasks] = useState([]);
    

    const fetchMoreTask = async () => {

        const token = authService.getAccessToken();

        if (page * 10 >= taskCreatedCount) {
            setHasMore(false);
            return;
        }

        const response = await fetch("api/UserProfile/GetTasks/" + userId + "/" + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json();

        setTasks([...tasks, ...data.postTasks]);

        setPage(++page)
    };
    
    return (
        <div>
            <InfiniteScroll
                dataLength={tasks.length}
                next={fetchMoreTask}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
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
                            <div> <Translation text={"text_tags"}/>{value.tags}</div>
                            <Link underline="hover" to={"/task/"+value.postTaskId} ><Translation text={"text_view_more"}/></Link>
                        </Paper>))}
                </div>
            </InfiniteScroll>
        </div>
    );
}