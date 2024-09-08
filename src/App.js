import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./utils/scrollToTop.js";
import Home from "./component/homePage/home.js";
import LogIn from "./component/logInPage/logIn.js";
import SignUp from "./component/signUpPage/signUP.js";
import CreateArticle from "./component/createArticle/createArticle.js";
import Content from "./component/contentPage/contentPage.js";
import NotFound from "./component/notFoundPage/notFound.js";
import "./component/start.css";

const PrivateRoute = ({ component: Component, test }) => {
    return (
        <>
            {localStorage.getItem("refreshToken") != undefined ? (
                <>
                    <div>Test Page {test}</div>
                </>
            ) : (
                <>
                    <Navigate to="/logInPage" replace />
                </>
            )}
        </>
    );
};

function App() {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/logInPage" element={<LogIn />} />
                    <Route path="/signUpPage" element={<SignUp />} />
                    <Route path="/createArticle" element={<CreateArticle />} />
                    <Route path="/content" element={<Content />} />
                    <Route
                        path="/privateRotue"
                        element={<PrivateRoute test="test1234" />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
