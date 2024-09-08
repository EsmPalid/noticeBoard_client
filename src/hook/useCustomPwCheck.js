import { useRef, useCallback } from "react";

const useCustomPwCheck = () => {
    const pwRef = useRef("");
    const pwCheckRef = useRef("");
    const pwCheckDiv = "pwCheckDiv";
    const pwStructureRef = useRef(false);

    const handlePwStructureCheck = useCallback(() => {
        const pw = pwRef.current.value;
        const element = document.querySelector(`#${pwCheckDiv}`);
        const pwRegExp =
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[-_\!\@\#\$\%\^\&\*\\\+\=\:\;\'\"\[\]\{\}\<\>\.\,\/\?]).{8,16}$/.exec(
                pw
            );

        const test = pw.match(
            /^(?=.*[A-Za-z])(?=.*[\p{N}])(?=.*[\p{P}\p{S}])(?!.*[^A-Za-z\p{N}\p{P}\p{S}]).{8,15}$/u
        );

        console.log(test);

        if (pw.length === 0) {
            element.innerHTML = "<div></div>";
            pwStructureRef.current = false;
        } else if (pwRegExp === null) {
            element.innerHTML =
                "<div style='color: red;'>형식에 맞지 않습니다.</div>";
            pwStructureRef.current = false;
        } else {
            element.innerHTML =
                "<div style='color: lightgreen;'>적절합니다.</div>";
            pwStructureRef.current = true;
        }
    }, []);

    return [
        { pwRef, pwCheckRef, pwCheckDiv, pwStructureRef },
        handlePwStructureCheck,
    ];
};

export default useCustomPwCheck;
