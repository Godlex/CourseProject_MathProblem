import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Translation} from "./translations/translation";
import {Button, IconButton, Stack, styled, Toolbar} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {CloudinaryContext, Image} from "cloudinary-react";

export function AddMathProblem() {
    
    const Input = styled('input')({
        display: 'none',
    });

    const [value, setValue] = React.useState();

    //save берем value (наш текст) и отправляем request

    return (
        <div className="container">
            <Toolbar>
                <Button variant="contained" >
                    <Translation text={"button_save"}/>
                </Button>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file"  />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Stack>
                <CloudinaryContext cloudName="diou4aybe">
                    <div>
                        <Image publicId="sample" width="350" />
                    </div>
                </CloudinaryContext>
            </Toolbar>
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown/>
        </div>
    );
}
