import react from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-dark text-white  p-4">
            <Container>
                <Row>
                    <Col md={12}>this is test notice_board web page</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
