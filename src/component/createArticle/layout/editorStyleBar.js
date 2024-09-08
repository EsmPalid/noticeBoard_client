import React, { useEffect, useState, useRef } from "react";
import "draft-js/dist/Draft.css";
import { Container, Row, Col } from "react-bootstrap";
import Editor from "./editor.js";
import InlineStyle from "./inlineStyle.js";
import BlockStyle from "./blockStyle.js";
import defaultAxios from "../../../api/defaultAxios.js";
import authAxios from "../../../api/authAxios.js";

const EditorStyleBar = () => {
    const [inlineStyle, setInlineStyle] = useState({
        // InlineStyle을 저장하는 State
        // toggle은 Style 값이 바뀌지 않아도 Button Click 시 , reRendering이 일어나게 해준다.
        style: "",
        toggle: false,
    });

    const [blockStyle, setBlockStyle] = useState({
        // BlockStyle을 저장하는 State
        style: "",
        toggle: false,
    });

    const [category, setCategory] = useState([]);
    // Server에서 category 값을 불러왔을 때 , 값을 저장하는 State
    // 해당 Stata값을 받아서  map 함수로 select ~ option 태그를 그린다.

    const categoryRef = useRef("");
    // select ~ option 태그에서 바뀐 option 값을 저장하는 Ref 값
    const articleTitleRef = useRef("");

    const onInlineClick = (e) => {
        // 자식 Component에서 부모 Component의 State 값을 바꾸게 해주는 Function
        // InlineSyle 컴포넌트(자식)에서  Button Click 시 , inlineStyle State 값이 변한다.
        setInlineStyle((prev) => {
            return {
                style: e,
                toggle: !prev.toggle,
            };
        });
        return true;
    };

    const onBlockClick = (e) => {
        // 자식 Component에서 부모 Component의 State 값을 바꾸게 해주는 Function
        setBlockStyle((prev) => {
            return {
                style: e,
                toggle: !prev.toggle,
            };
        });
    };

    const categoryLoading = async () => {
        try {
            const response = await defaultAxios.get("/contentProcess");
            if (response.status === 200) {
                setCategory(response.data);
            } else {
                // 모종의 이유로 Server에서 Category 정보 Loading이 실패함
                // 그와 관련된 Logic
            }
        } catch (err) {
            // Server에서 값을 읽어오지 못해 Error 발생
            // 404 Error로 처리할까?
            // 500 번대 Error로 처리할까?
            // 일단 404 Page로 이동시켰다.
            // 502 bad Gateway로 처리하려면 새로운 Page를 만들어야한다.
            // 귀찮다.
            window.location.replace("/notFonud");
        }
    };

    const changeCategory = (event) => {
        // select ~ option 태그에서
        // option 값(Category 목록)이 바뀌었을 때 , 그 값을 categoryRef에 저장함
        const selectCategory = event.target.value;
        categoryRef.current = selectCategory;
    };

    useEffect(() => {
        categoryLoading();
    }, []);

    const sendArticleContent = async () => {
        // 글쓰기(ArticleContent)가 완료되어 Server에 해당 내용을 보내는 Axios 부분

        const result = category.filter((item) => {
            // categoryRef의 값이 category State 배열에 존재하는 값인지 판단함
            // User가 Category를 선택했는지 확인하는 부분
            // cateogryRef 값이 category 배열에 값이 존재하지 않을 시 , 빈 배열을 반환
            // 빈 배열은 길이가 0 이므로 그것으로 판단함

            return item === categoryRef.current;
        });

        if (result.length === 0) {
            // category State 배열에 User가 선택한 category 값이 없음
            // category를 선택하지 않았음

            alert("Category를 선택하세요");
        } else {
            const blockMap = localStorage.getItem("my-draft");
            const title = articleTitleRef.current.value;
            const category = categoryRef.current;
            await authAxios.post("/createArticle/create", {
                title,
                category,
                blockMap,
            });

            window.location.href = "/";
        }
    };

    return (
        <>
            <Container
                fluid="md"
                style={{
                    border: "1px solid",
                    padding: "1rem",
                    borderBottom: "none",
                }}
            >
                <Row>
                    <input
                        className="form-control-sm"
                        type="text"
                        placeholder="글제목"
                        ref={articleTitleRef}
                    ></input>
                </Row>

                <Row>
                    <Col>
                        <div className="form-text">
                            글의 제목을 입력하는 곳 입니다.
                        </div>
                    </Col>
                </Row>

                <Row style={{ padding: "1rem" }}>
                    <Col className="input-group">
                        <label className="input-group-text">Category </label>
                        <select
                            className="form-select"
                            name="category"
                            onChange={changeCategory}
                        >
                            <option>선택하세요</option>
                            {category.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-text">
                            글의 분류가 어떻게 되는지 고릅니다. (필수)
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container
                fluid="md"
                style={{
                    border: "1px solid",
                    padding: "1rem",
                    borderBottom: "none",
                }}
            >
                <Row>
                    <Col sm={2}>InlineStyle : </Col>
                    <Col>
                        <InlineStyle onInlineClick={onInlineClick} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>BlockStyle : </Col>

                    <Col>
                        <BlockStyle onBlockClick={onBlockClick} />
                    </Col>
                </Row>
            </Container>
            <Container fluid="md" style={{ border: "1px solid" }}>
                <Row style={{ height: "40rem", overflowY: "auto" }}>
                    <Editor inlineStyle={inlineStyle} blockStyle={blockStyle} />
                </Row>
            </Container>
            <Container fluid="md">
                <Row style={{ padding: "10px" }}>
                    <Col sm={12} md={2}>
                        <button
                            onClick={sendArticleContent}
                            style={{ width: "100%" }}
                        >
                            확인
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditorStyleBar;
