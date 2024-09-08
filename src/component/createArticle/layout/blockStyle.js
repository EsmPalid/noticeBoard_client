import React from "react";
import { RichUtils } from "draft-js";
import { Button } from "react-bootstrap";

let BLCOK_TYPES = [
    {
        label: "H1",
        style: "header-one",
    },
    {
        label: "H2",
        style: "header-two",
    },
    {
        label: "H3",
        style: "header-three",
    },
    {
        label: "H4",
        style: "header-four",
    },
    {
        label: "H5",
        style: "header-five",
    },
    {
        label: "H6",
        style: "header-six",
    },
    {
        label: "Blockquote",
        style: "blockquote",
    },
    {
        label: "UL",
        style: "unordered-list-item",
    },
    {
        label: "OL",
        style: "ordered-list-item",
    },
    {
        label: "Code Block",
        style: "code-block",
    },
];

const BlockStyle = ({ onBlockClick }) => {
    const StyleButton = (props) => {
        let onClickButton = (e) => {
            e.preventDefault();
            props.onToggle(props.style);
        };

        return <Button onMouseDown={onClickButton}>{props.label}</Button>;
    };

    return (
        <>
            {BLCOK_TYPES.map((props) => {
                return (
                    <StyleButton
                        key={props.label}
                        label={props.label}
                        style={props.style}
                        onToggle={onBlockClick}
                    ></StyleButton>
                );
            })}
        </>
    );
};

export default React.memo(BlockStyle);
