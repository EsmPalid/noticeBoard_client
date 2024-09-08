import React, { useEffect } from "react";
import "draft-js/dist/Draft.css";
import Navigation from "../homePage/layout/navigation.js";
import Body from "../homePage/layout/body.js";
import Title from "../homePage/layout/title.js";
import Footer from "../homePage/layout/footer.js";
import StyleBar from "./layout/editorStyleBar.js";

const CreateArticle = () => {
    return (
        <>
            <Navigation />
            <Body Title={Title} StyleBar={StyleBar} Footer={Footer}></Body>
        </>
    );
};

export default React.memo(CreateArticle);
