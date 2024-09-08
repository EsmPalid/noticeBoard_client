import React, { useState, useEffect, createContext, useRef } from "react";
import defaultAxios from "../../../api/defaultAxios.js";
import "../css/body.css";

export const articleContext = createContext();

const Body = ({ Title, Menu, Aside, Board, Content, StyleBar, Footer }) => {
    const [article, setArticle] = useState([]);
    const testRef = useRef();

    const loadArticle = async () => {
        const result = await defaultAxios("/articleProcess");

        setArticle(result.data);
        testRef.current = result.data;
    };

    useEffect(() => {
        loadArticle();
    }, []);

    return (
        <>
            <articleContext.Provider value={[article]}>
                <div id="bodyBackground">
                    <div id="bodyPage">
                        {Title && <Title id="title" />}
                        {Menu ? (
                            <Menu id="menu" />
                        ) : (
                            <div style={{ paddingBottom: "7rem" }}></div>
                        )}

                        <div id="noticeBoard" className="p-1">
                            {Board && <Board />}

                            {StyleBar && <StyleBar />}
                        </div>
                        <div id="noticeBoard" className="p-1">
                            {Content && <Content />}
                        </div>
                    </div>

                    {/*Body page End*/}
                    <div id="navigationPage" className="d-sm-none d-md-flex">
                        {Aside && <Aside />}
                    </div>
                </div>
                {Footer && <Footer />}
            </articleContext.Provider>
        </>
    );
};

export default Body;
