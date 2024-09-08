import { useRef } from "react";
import defaultAxios from "../api/defaultAxios";

const useCustomeNickNameCheck = () => {
    const nickNameRef = useRef();
    const nickNameCheckDiv = "nickNameCheckDiv";
    const nickNameAvailableRef = useRef(false);

    const handleNickNameChangeReset = () => {
        const element = document.querySelector(`#${nickNameCheckDiv}`);

        element.innerHTML = `<div></div>`;
    };

    const handleNickNameAvailableCheck = async () => {
        try {
            const nickName = nickNameRef.current.value;

            const result = await defaultAxios.post(
                // result 값이 true일 경우 중복된 NickName이 존재하며
                // false일 경우 중복된 NickName이 없다.
                "/signUpProcess/signNickNameCheck",
                {
                    nickName: nickName,
                }
            );

            const element = document.querySelector(`#${nickNameCheckDiv}`);

            if (nickNameRef.current.value === "") {
                element.innerHTML = `<div style= 'color: red;'>닉네임을 입력해주세요</div>`;
            } else if (result.data) {
                element.innerHTML = `
                    <div style= 'color: red;'>
                    사용중인 닉네임 입니다.
                    </div>
                `;
                nickNameAvailableRef.current = false;
            } else {
                element.innerHTML = `
                    <div style= 'color: lightgreen;'>
                        사용 가능한 닉네임입니다.
                    </div>
                    `;
                nickNameAvailableRef.current = true;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return [
        { nickNameRef, nickNameCheckDiv, nickNameAvailableRef },
        handleNickNameChangeReset,
        handleNickNameAvailableCheck,
    ];
};

export default useCustomeNickNameCheck;
