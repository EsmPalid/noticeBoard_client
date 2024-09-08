import { useState, useRef, useEffect } from "react";
import defaultAxios from "../../../api/defaultAxios.js";
import useResize from "../../../hook/useCustomResize.js";
import useIdCheck from "../../../hook/useCustomIdCheck.js";
import usePwCheck from "../../../hook/useCustomPwCheck.js";
import useNickNameCheck from "../../../hook/useCustomNickNameCheck.js";
import "../css/signUpForm.css";

const SignUpForm = () => {
    const [clientHeight, handleResize] = useResize();
    // ~Available       사용가능 하면 true , 아닐 시 false
    // ~Structure       형식적으로 맞으면 true , 아닐 시 false
    const [
        {
            idRef,
            idAvailableCheckDiv,
            idStructureCheckDiv,
            idStructureRef,
            idAvailableRef,
        },
        handleIdAvailableCheck,
        handleIdStructureCheck,
    ] = useIdCheck();

    const [
        { pwRef, pwCheckRef, pwCheckDiv, pwStructureRef },
        handlePwStructureCheck,
    ] = usePwCheck();

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    const [
        { nickNameRef, nickNameCheckDiv, nickNameAvailableRef },
        handleNickNameChangeReset,
        handleNickNameAvailableCheck,
    ] = useNickNameCheck();

    const [emailDomain, setEmailDomain] = useState("");
    const emailRef = useRef("");

    const handleEmailBox = (email) => {
        if (email.target.value === "선택하세요") {
            setEmailDomain("");
        } else {
            console.log(email.target.value);
            setEmailDomain(email.target.value);
        }
    };

    const handleCreateUser = async () => {
        if (!idStructureRef.current) {
            alert("아이디가 형식에 맞치 않습니다.");
            document.querySelector(`#idInputTag`).focus();
        } else if (!idAvailableRef.current) {
            alert("ID 중복확인 버튼을 클릭해 중복여부를 확인해주세요");
            document.querySelector(`#idInputTag`).focus();
        } else if (!pwStructureRef.current) {
            alert("비밀번호가 형식에 맞지 않습니다.");
            document.querySelector(`#pwInputTag`).focus();
        } else if (!(pwRef.current.value === pwCheckRef.current.value)) {
            console.log(pwRef);
            document.querySelector("#pwCheckInputTag").focus();
            alert("비밀번호가 다릅니다. 다시 확인해주세요");
        } else if (!nickNameAvailableRef.current) {
            alert("닉네임 중복확인 버튼을 클릭해 중복여부를 확인해주세요");
            document.querySelector(`#nickNameInputTag`).focus();
        } else if (emailRef.current.value === "" || emailDomain === "") {
            alert("이메일을 입력해주세요");
            document.querySelector(`#emailInputTag`).focus();
        } else {
            const userAgent = navigator.userAgentData;

            const result = await defaultAxios.post("/signUp", {
                id: idRef.current.value,
                pw: pwRef.current.value,
                nickName: nickNameRef.current.value,
                email: `${emailRef.current.value}@${emailDomain}`,
                userAgent: userAgent,
            });
            console.log(result);

            window.location.replace("http://localhost:3000");
        }
    };

    return (
        <>
            <div
                id="background"
                style={{
                    height:
                        clientHeight == 0
                            ? document.documentElement.clientHeight
                            : clientHeight,
                }}
            >
                <div id="signUpForm">
                    <div className="signUpFormDiv">ID</div>
                    <div className="signUpFormDiv">
                        <div className="signUpFormDivElement">
                            <input
                                id="idInputTag"
                                onChange={handleIdStructureCheck}
                                type="text"
                                placeholder="아이디(6~12자의 영문, 숫자 , -, _ 사용가능)"
                                minLength="6"
                                maxLength="12"
                                ref={idRef}
                            />
                        </div>
                        <div className="signUpFormDivElement">
                            <button onClick={handleIdAvailableCheck}>
                                ID 중복확인
                            </button>
                        </div>
                        <div
                            id={idAvailableCheckDiv}
                            className="signUpFormDivElement"
                        ></div>
                    </div>

                    <div
                        id={idStructureCheckDiv}
                        className="signUpFormDiv"
                    ></div>

                    <div className="signUpFormDiv">P/W</div>
                    <div className="signUpFormDiv">
                        <div className="signUpFormDivElement">
                            <input
                                id="pwInputTag"
                                onChange={handlePwStructureCheck}
                                type="password"
                                placeholder="비밀번호(8자리~16자리 영문, 숫자, 특수문자)"
                                minLength="8"
                                maxLength="16"
                                ref={pwRef}
                            />
                        </div>
                        <div className="signUpFormDivElement"></div>
                    </div>

                    <div id={pwCheckDiv} className="signUpFormDiv"></div>

                    <div className="signUpFormDiv">P/W 확인</div>
                    <div className="signUpFormDiv">
                        <div className="signUpFormDivElement">
                            <input
                                id="pwCheckInputTag"
                                type="password"
                                minLength="8"
                                maxLength="16"
                                ref={pwCheckRef}
                            />
                        </div>
                        <div className="signUpFormDivElement"></div>
                    </div>

                    <div className="signUpFormDiv"></div>

                    <div className="signUpFormDiv">닉네임</div>
                    <div className="signUpFormDiv">
                        <div className="signUpFormDivElement">
                            <input
                                onChange={handleNickNameChangeReset}
                                id="nickNameInputTag"
                                type="text"
                                maxLength="8"
                                ref={nickNameRef}
                            />
                        </div>
                        <div className="signUpFormDivElement">
                            <button onClick={handleNickNameAvailableCheck}>
                                중복확인
                            </button>
                        </div>
                        <div
                            className="signUpFormDivElement"
                            id={nickNameCheckDiv}
                        ></div>
                    </div>

                    <div className="signUpFormDiv"></div>

                    <div className="signUpFormDiv">E-mail</div>
                    <div className="signUpFormDiv">
                        <div className="signUpFormDivElement">
                            <input
                                type="text"
                                minLength="8"
                                maxLength="16"
                                ref={emailRef}
                                style={{ minWidth: `15%`, maxWidth: `50%` }}
                            />
                            @
                            <input
                                id="emailInputTag"
                                type="text"
                                value={emailDomain}
                                disabled
                                minLength="8"
                                maxLength="16"
                                style={{
                                    minWidth: `15%`,
                                    maxWidth: `50%`,
                                }}
                            />
                        </div>
                        <div className="signUpFormDivElement">
                            <select onChange={handleEmailBox}>
                                <option>선택하세요</option>
                                <option name="naver">naver.com</option>
                                <option name="hanmail">hanmail.net</option>
                                <option name="gmail">gmail.com</option>
                            </select>
                        </div>
                    </div>

                    <div className="signUpFormDiv"></div>

                    <div className="signUpFormDiv">
                        <button onClick={handleCreateUser}>확인</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
