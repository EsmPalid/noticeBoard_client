import { useEffect, useRef } from "react";
import defaultAxios from "../../../api/defaultAxios";
import useToggle from "../../../hook/useCustomToggle.js";
import useResize from "../../../hook/useCustomResize.js";
import "../css/logInForm.css";

const LogInForm = () => {
    const idRef = useRef();
    const pwRef = useRef();
    const [idRemember, rememberIdCheckBox] = useToggle(
        localStorage.getItem("idRemember") ? true : false
    );

    useEffect(() => {
        if (idRemember) {
            localStorage.setItem("idRemember", idRef.current.value);
        } else {
            localStorage.removeItem("idRemember");
        }
    }, [idRemember]);

    const [clientHeight] = useResize();

    const handleLogin = async () => {
        const result = await defaultAxios.post(`/api/public/logIn`, {
            userLogInId: idRef.current.value,
            userPw: pwRef.current.value,
        });

        if (result.data.refreshToken) {
            console.log("logIn 성공");
            localStorage.setItem("refreshToken", result.data.refreshToken);
            localStorage.setItem("accessToken", result.data.accessToken);

            // window.location.href = "http://localhost:3000";
        } else {
            // alter를 사용해서 몇번 실패했는지 보여주는 Logic을 처리할 수 있다.
            // 하지만 , Server를 또 뜯어 고쳐야하니 Pass
            console.log("logIn 실패");
        }
    };

    return (
        <div
            id="background"
            style={{
                height:
                    clientHeight == 0
                        ? document.documentElement.clientHeight
                        : clientHeight,
            }}
        >
            <div id="logInForm">
                <div className="logInFormDiv">
                    ID&emsp;
                    <input
                        name="userId"
                        type="text"
                        defaultValue={
                            // defaultValue와 value는 서로 다르다.
                            localStorage.getItem("idRemember")
                                ? localStorage.getItem("idRemember")
                                : ""
                        }
                        placeholder="ID"
                        ref={idRef}
                    />
                </div>
                <br />
                <div className="logInFormDiv">
                    P/W&emsp;
                    <input
                        name="userPw"
                        type="passWord"
                        placeholder="PW"
                        ref={pwRef}
                    />
                </div>
                <br />
                <div className="logInFormDiv">
                    <h5>
                        ID를 기억하시겠습니까?
                        <input
                            type="checkbox"
                            onClick={rememberIdCheckBox}
                            defaultChecked={idRemember}
                        />
                    </h5>
                </div>
                <div className="logInFormDiv">
                    <button onClick={handleLogin}>Ok</button>
                </div>
                <div>
                    <a href="htt://localhost:8080/">Forget ID?</a>
                    &emsp;&emsp;&emsp;&emsp;
                    <a href="http://localhost:8080/signUp">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LogInForm;
