import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Translation} from "./translations/translation";
import {Box, Button, TextareaAutosize, TextField, Toolbar, Typography} from "@mui/material";

export function AddMathProblem() {

    const [value, setValue] = useState();
    const [taskName, setTaskName] = useState();

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

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
                autoComplete="Task Name 2"
            />

            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown/>

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

