import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Translation} from "./translations/translation";
import {Box, Button, TextField, Toolbar} from "@mui/material";
import {WithContext as ReactTags} from 'react-tag-input';
import './custom.css';
import {useHistory} from "react-router-dom";
import authService from "./components/api-authorization/AuthorizeService";


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export function AddMathProblem() {

    let history = useHistory();

    const [tags, setTags] = useState([]);

    const [value, setValue] = useState();
    const [taskName, setTaskName] = useState();
    const [answer, setAnswer] = useState();

    const [image, setImage] = useState("");

    const [url, setUrl] = useState("");

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "leanqhhm")
        data.append("cloud_name", "diou4aybe")
        fetch("https://api.cloudinary.com/v1_1/diou4aybe/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    //save берем value (наш текст) и отправляем request


    const saveTask = async () => {
        const task = {
            Name: taskName,
            TaskCondition: value,
            Tags: tags.map(tag => tag.text),
            RightAnswer: answer
        };
        const token = await authService.getAccessToken();
        fetch("/api/MathProblem", {
            method: "post", body: JSON.stringify(task), headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(() => history.push("/"))
    }

    return (
        <div className="container">

            <Toolbar>
                <Button variant="contained" onClick={saveTask}>
                    <Translation text={"button_save"}/>
                </Button>
            </Toolbar>

            <TextField
                valeu={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                label={<Translation text={"text_Task_name"}/>}
            />

            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown/>

            <div>
                <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                />
            </div>

            <TextField
                valeu={answer}
                onChange={(e) => setAnswer(e.target.value)}
                label={<Translation text={"text_Answer"}/>}
            />

            <Box>
                <Box sx={{display: 'flex'}}>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <button onClick={uploadImage}>{<Translation text={"text_Upload"}/>}</button>
                    <Button variant="outlined" color="primary" onClick={() => {
                        navigator.clipboard.writeText(url)
                    }}>
                        <Translation text={"text_copy_image_url"}/>
                    </Button>
                </Box>
                <Box>
                    <Box>
                        <h1><Translation text={"text_preview_image"}/></h1>
                    </Box>
                    <img src={url} width={"50%"} alt={"image"}/>
                </Box>
            </Box>

        </div>
    );
}

