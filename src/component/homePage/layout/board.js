import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../../../api/authAxios.js";
import { Pagination, Row, Col, Button, Table } from "react-bootstrap";
import { articleContext } from "../layout/body.js";

const Borad = () => {
    const navigate = useNavigate();
    const [article] = useContext(articleContext);

    const tokenVerify = async () => {
        const result = await authAxios.get("/accessToken/tokenVerify");
        if (result) {
            navigate("/createArticle");
        }
    };

    const loadContent = (event) => {
        const id = event.currentTarget.id;

        window.location.href = `http://localhost:3000/content?id=${id}`;
    };

    const makeBoard = () => {
        const result = article.map((item, index) => {
            // YYYY-MM-DD에 따른 '작성일' Column이 다르게 보이게 하는 logic
            const toDay = new Date();
            const utcTime = -540 * 60 * 1000;
            // 원래는 getTimezoenOffset()을 사용했으나 , Host System의 환경에 따라서
            // 시간이 달리 표기될 수 있으므로 UTC+9 시간으로 통일한다.

            const toDayYmd = new Date(toDay.getTime() - utcTime)
                .toISOString()
                .slice(0, 10);

            const writeDate = new Date(item.writeDate);
            const writeYmd = new Date(writeDate.getTime() - utcTime)
                .toISOString()
                .slice(0, 10);

            let showDate;

            if (toDayYmd === writeYmd) {
                showDate = new Date(writeDate.getTime() - utcTime)
                    .toISOString()
                    .slice(11, 16);
            } else {
                showDate = writeYmd;
            }
            // YYYY-MM-DD에 따른 '작성일' Column이 다르게 보이게 하는 logic

            return (
                <tbody
                    key={index}
                    id={item.id}
                    onClick={loadContent}
                    style={{ cursor: "pointer" }}
                >
                    <tr>
                        <td name="글번호">
                            {item.maxArticle - item.page * 10 - index}
                        </td>
                        <td name="카테고리">{item.category}</td>
                        <td name="제목">{item.title}</td>
                        <td name="작성자">{item.writer}</td>
                        <td name="작성일">{showDate}</td>
                    </tr>
                </tbody>
            );
        });
        return result;
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                {makeBoard()}
            </Table>

            <Row>
                <Col>
                    <Pagination>
                        <Pagination.First></Pagination.First>
                        <Pagination.Prev></Pagination.Prev>
                        <Pagination.Item>1</Pagination.Item>
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <Col
                    style={{
                        textAlign: "right",
                    }}
                >
                    <Button>Test</Button>

                    <Button
                        className="justify-content-around"
                        variant="secondary"
                        onClick={tokenVerify}
                        // href="/createArticle"
                    >
                        글쓰기
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default React.memo(Borad);
