import React from "react";
import { RichUtils } from "draft-js";
import { Button } from "react-bootstrap";

let INLINE_STYLES = [
    {
        label: "Bold",
        style: "BOLD",
        toggle: false,
    },
    {
        label: "Italic",
        style: "ITALIC",
        toggle: false,
    },
    {
        label: "Underline",
        style: "UNDERLINE",
        toggle: false,
    },
    {
        label: "Monospace",
        style: "CODE",
        toggle: false,
    },
];

const InlineStyle = ({ onInlineClick }) => {
    const StyleButton = (props) => {
        let onClickButton = (e) => {
            const toggle = INLINE_STYLES[props.index].toggle;
            INLINE_STYLES[props.index].toggle = !toggle;
            e.preventDefault();
            props.onToggle(props.style);
        };

        return (
            <Button
                onMouseDown={onClickButton}
                style={props.toggle ? { backgroundColor: "#646EFF" } : {}}
            >
                {props.label}
            </Button>
        );
    };

    return (
        <>
            {INLINE_STYLES.map((props, index) => {
                return (
                    <StyleButton
                        key={index}
                        label={props.label}
                        style={props.style}
                        toggle={props.toggle}
                        index={index}
                        onToggle={onInlineClick}
                    ></StyleButton>
                );
            })}
        </>
    );
};
export default React.memo(InlineStyle);
