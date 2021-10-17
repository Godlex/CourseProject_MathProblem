import InfiniteScroll from "react-infinite-scroll-component";
import React, {useState} from "react";
import authService from "./api-authorization/AuthorizeService";

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
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div>{tasks.map(value => (<div>{value.name}</div>))}</div>
            </InfiniteScroll>
        </div>
    );
}