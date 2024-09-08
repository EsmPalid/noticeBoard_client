import React, { useState, useEffect, useRef } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw,
    ContentState,
    ContentBlock,
    CharacterMetadata,
} from "draft-js";
import "draft-js/dist/Draft.css";

const EditorBody = ({ inlineStyle, blockStyle }) => {
    const isMounted = useRef(false);

    const [editorState, setEditorState] = useState(() => {
        if (localStorage.getItem("my-draft") !== null) {
            const savedData = JSON.parse(localStorage.getItem("my-draft"));

            const newEditorState = EditorState.createWithContent(
                convertFromRaw(savedData)
            );

            if (savedData) {
                return newEditorState;
            } else {
                return EditorState.createEmpty();
            }
        } else {
            return EditorState.createEmpty();
        }
    });

    useEffect(() => {
        if (isMounted.current) {
            const newState = RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle.style
            );
            setEditorState(newState);
        }
    }, [inlineStyle]);

    useEffect(() => {
        if (isMounted.current) {
            const newState = RichUtils.toggleBlockType(
                editorState,
                blockStyle.style
            );
            setEditorState(newState);
        } else {
            isMounted.current = true;
        }
    }, [blockStyle]);

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        localStorage.setItem("my-draft", JSON.stringify(raw));
    }, [editorState]);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return "handled";
        }

        return "not-handled";
    };

    return (
        <>
            <Editor
                editorState={editorState}
                placeholder="원하는 글을 입력하시오."
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
            />
        </>
    );
};

export default React.memo(EditorBody);
