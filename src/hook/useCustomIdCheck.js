import { useRef } from "react";
import defaultAxios from "../api/defaultAxios";

const useCustomIdAvailable = () => {
    const idRef = useRef();
    // id의 value를 저장할 변수임

    const idStructureRef = useRef(false);
    // boolean 형식의 Data Type으로 ID가 형식에 맞으면 true ,
    // 틀리면 false

    const idAvailableRef = useRef(false);
    // boolean 형식의 Data Type으로 ID가 사용가능하면 true ,
    // 불가능하면 false가 된다.

    const idAvailableCheckDiv = "idAvailableCheckDiv";
    // 중복확인 버튼 Click 시 , 사용가능한지 불가능한지 알려주는
    // Div 태그의 id가 담겨져 있다.
    const idStructureCheckDiv = "idStructureCheckDiv";
    // id 생성을 하기 위해 Typing 시 , 해당 id가 형식에 맞는지
    // 검사하는 Div 태그의 id가 담겨져 있다.

    const handleIdStructureCheck = () => {
        const idRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,15}$/g.exec(
            idRef.current.value
        );
        const idLength = idRef.current.value.length;

        console.log(idRegExp);

        const element = document.querySelector(`#${idStructureCheckDiv}`);
        const AvailableElement = document.querySelector(
            `#${idAvailableCheckDiv}`
        );

        idAvailableRef.current = false;
        AvailableElement.innerHTML = "<div id='idUnavailable'></div>";

        if (idLength < 1) {
            element.innerHTML = "<div style='color: red;'></div>";
            idStructureRef.current = false;
        } else if (idLength < 6) {
            element.innerHTML =
                "<div style='color: red;'>길이가 너무 짧습니다</div>";
            idStructureRef.current = false;
        } else if (idRegExp === null) {
            element.innerHTML =
                "<div style='color: red;'>영문, 숫자, -, _ 이외에는 사용할 수 없습니다.</div>";
            idStructureRef.current = false;
        } else {
            element.innerHTML = "<div style='color: lightgreen;'>적절함</div>";
            idStructureRef.current = true;
        }
    };

    const handleIdAvailableCheck = async () => {
        try {
            const id = idRef.current.value;
            const element = document.querySelector(`#${idAvailableCheckDiv}`);

            if (idStructureRef.current) {
                const result = await defaultAxios.post(
                    "/signUpProcess/signIdCheck",
                    {
                        id: id,
                    }
                );
                console.log(result);
                if (result.data) {
                    element.innerHTML =
                        "<div id='idUnavailable' style='color: red;'>중복된 ID 입니다.</div>";
                } else {
                    element.innerHTML =
                        "<div id='idAvailable' style='color: lightgreen;'>가능한 ID 입니다.</div>";
                    idAvailableRef.current = true;
                }
            } else {
                alert("ID 형식이 맞지 않습니다.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return [
        {
            idRef,
            idAvailableCheckDiv,
            idStructureCheckDiv,
            idStructureRef,
            idAvailableRef,
        },
        handleIdAvailableCheck,
        handleIdStructureCheck,
    ];
};

export default useCustomIdAvailable;
