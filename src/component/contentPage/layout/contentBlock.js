import { useState, useEffect, useRef, useContext } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Container, Col, Row } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { articleContext } from "../../homePage/layout/body.js";
import defaultAxios from "../../../api/defaultAxios.js";

const ContentBlock = () => {
    const contentDataRef = useRef({});

    // 해당 content의 정보(글쓴이 , 편집날짜 등등)를 저장하는 ref
    // content 값을 가져오면서 editorState 값이 변하므로 Re-rendering된다.
    // 그러므로 useState()로 저장할 필요가 없다.
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty();
    });

    const [article] = useContext(articleContext);

    const loadContent = async () => {
        const result = await defaultAxios("/contentProcess");
        const content = JSON.parse(result.data.content);

        contentDataRef.current = result.data;
        contentDataRef.ok = true;

        const newEditorState = convertFromRaw(content);

        setEditorState(() => {
            return EditorState.createWithContent(newEditorState);
        });
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <>
            {contentDataRef.ok ? (
                <Container fluid="md" style={{ marginBottom: "10rem" }}>
                    <Row
                        style={{
                            alignItems: "center",
                            backgroundColor: "rgba(100, 100, 100, 0.3)",
                            minHeight: "3rem",
                            fontWeight: "bold",
                        }}
                    >
                        <Col xs={4} sm={2}>
                            [{contentDataRef.current.category}]
                        </Col>
                        <Col xs={8} sm={10}>
                            {contentDataRef.current.title}
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: "1rem" }}>
                        <Col>{contentDataRef.current.writer}</Col>
                        <Col style={{ fontSize: "0.8rem" }}>
                            &nbsp;{`좋아요: ${contentDataRef.current.likes}`}
                            &nbsp;{`조회수: ${contentDataRef.current.views}`}
                            &nbsp;
                            {`작성일:${format(
                                parseISO(contentDataRef.current.writeDate),
                                "yyyy-MM-dd"
                            )}`}
                        </Col>
                    </Row>
                    <Row
                        style={{
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                            minHeight: "25rem",
                        }}
                    >
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            readOnly
                        ></Editor>
                    </Row>
                </Container>
            ) : (
                false
            )}
        </>
    );
};

export default ContentBlock;
