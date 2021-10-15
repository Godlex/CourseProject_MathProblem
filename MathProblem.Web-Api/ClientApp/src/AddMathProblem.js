import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Translation} from "./translations/translation";
import {Box, Button, TextareaAutosize, TextField, Toolbar, Typography} from "@mui/material";
import {WithContext as ReactTags} from 'react-tag-input';
import './custom.css';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export function AddMathProblem() {

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


    return (
        <div className="container">
            <Toolbar>
                <Button variant="contained">
                    <Translation text={"button_save"}/>
                </Button>
            </Toolbar>

            <TextField
                valeu={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                label={<Translation text={"text_Task_name"}/>}
                autocomplete
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
                autocomplete
            />

            <Box>
                <Box sx={{display: 'flex'}}>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <button onClick={uploadImage}>{<Translation text={"text_Upload"}/>}</button>
                    <Button variant="outlined" color="primary" onClick={() => {
                        navigator.clipboard.writeText(url)
                    }}>
                        Copy image url
                    </Button>
                </Box>
                <Box>
                    <Box>
                        <h1>Preview image</h1>
                    </Box>
                    <img src={url} width={"50%"} alt={"image"}/>
                </Box>
            </Box>

        </div>
    );
}

