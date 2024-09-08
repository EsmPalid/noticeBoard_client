import { useState, useCallback, useRef } from "react";

const useCustomScroll = () => {
    const [toggle, setToggle] = useState(false);
    const [scroll, setScroll] = useState(0);
    const moveRef = useRef();
    const moveStartRef = useRef();

    const handleMouseDown = useCallback((e) => {
        setToggle(true);
        moveStartRef.current = e.clientX;
    }, []);
    const handleMouseUp = useCallback(() => {
        setToggle(false);
        moveStartRef.current = 0;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (toggle) {
            const scrollTrigger = 0;
            // moveScroll이 일정 이상 거리 움직였을 때, Trigger가 발생함
            // 현재는 사용안함 , 0 고정 or 아주 작은 숫자 권장
            // 현재는 0 대신 사용중

            const maxScrollSize =
                moveRef.current.scrollWidth - moveRef.current.clientWidth;
            // Element의 Scrollbar의 최대길이를 담는 상수

            const moveScroll = moveStartRef.current - e.clientX;
            // Evente(onMouseMove)가 발생할 때 마다
            // Mouse가 왼쪽(-) 또는 오른쪽(+)으로 움직인 거리를 담는 상수

            if (moveScroll > scrollTrigger) {
                setScroll((prev) => {
                    if (prev < maxScrollSize) {
                        // Scroll값이 Scrollbar의 최대값보다 작다면
                        // scrollSpeep 만큼 Scroll값을 늘림
                        return (prev += moveScroll);
                    } else {
                        // Scroll값이 Scrollbar의 최대값을 넘었다면
                        // Scrollbar의 최대값으로 만듬
                        return maxScrollSize;
                    }
                });
            } else if (moveScroll < -scrollTrigger) {
                setScroll((prev) => {
                    if (prev > 0) {
                        return (prev += moveScroll);
                    } else {
                        return 0;
                    }
                });
            }
            moveStartRef.current = e.clientX;
            // console.log(moveScroll);
            // console.log(scroll);
            moveRef.current.scrollLeft = scroll;
        }
    });

    return {
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        moveRef,
        // ## Usage
        // Scroll을 Move시키고 싶은 Element에 다 때려박아라
        // 참고, handleMouseUp은 onMouseUp하고 onMouseLeave에 같이 써야한다.
    };
};

export default useCustomScroll;
