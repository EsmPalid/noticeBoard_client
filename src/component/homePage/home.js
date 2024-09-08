import React from "react";
import Navigation from "./layout/navigation.js";
import Body from "./layout/body.js";
import Footer from "./layout/footer.js";
import Aside from "./layout/aside.js";
import Title from "./layout/title.js";
import Board from "./layout/board.js";
import Menu from "./layout/menu.js";

const Home = () => {
    return (
        <>
            <Navigation />

            <Body
                Title={Title}
                Menu={Menu}
                Aside={Aside}
                Board={Board}
                Footer={Footer}
            ></Body>
        </>
    );
};

export default Home;
