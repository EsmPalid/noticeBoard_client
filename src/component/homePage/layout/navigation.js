import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Navbar,
    Nav,
    NavbarCollapse,
    NavbarToggle,
} from "react-bootstrap";
import "../css/navigation.css";

const Navigation = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener("resize", () => {
            console.log(document.documentElement.clientWidth);
        });
    }, []);

    return (
        <>
            <Navbar
                expand="md"
                data-bs-theme="dark"
                bg="dark"
                collapseOnSelect="ture"
            >
                <Container fluid="md">
                    <Navbar.Brand href="/">Notice_board Web Site</Navbar.Brand>
                    <NavbarToggle />
                    <NavbarCollapse>
                        <Nav className="d-md-none" navbarScroll>
                            <Nav.Link onClick={() => navigate("/logInPage")}>
                                login
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/signUpPage")}>
                                signup
                            </Nav.Link>
                            <Nav.Link href="#.action3">Action</Nav.Link>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
