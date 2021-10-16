import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import authService from "./api-authorization/AuthorizeService";

export function Tasks({userId,taskCreatedCount}) {
    let hasMore=true;
    let page=0;
    
    const fetchMoreTask = () => {
        
        const token = authService.getAccessToken();
        
        if (page >= taskCreatedCount ) {
            hasMore = false;
            return ;
        }

        const response =  fetch("api/UserProfile/GetTasks/" + userId + "/" + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data =  response.json;

        page++;
    };

    return (<InfiniteScroll
        dataLength={10}
        next={fetchMoreTask}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{textAlign: "center"}}>
                <b>Yay! You have seen it all</b>
            </p>
        }
    >
        <div>{null}</div>
        <div>aaaa</div>
    </InfiniteScroll>);
}