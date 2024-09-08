import React from "react";
import Navigation from "../homePage/layout/navigation.js";
import Body from "../homePage/layout/body.js";
import Title from "../homePage/layout/title.js";
import Footer from "../homePage/layout/footer.js";
import ContentBlock from "./layout/contentBlock.js";

const Content = () => {
    return (
        <>
            <Navigation />
            <Body Title={Title} Content={ContentBlock} Footer={Footer}></Body>
        </>
    );
};

export default Content;
