import useCustomScrollMove from "../../../hook/useCustomScrollMove.js";

const Menu = () => {
    const { handleMouseDown, handleMouseUp, handleMouseMove, moveRef } =
        useCustomScrollMove();

    const onMenuHref = (e) => {
        console.log(e.target.innerText);
    };

    return (
        <>
            <div
                id="menu"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                // Mouse가 menu Element를 떠날 때 toggle 시킴
                // 이는 handleMouseUp과 같은 동작을 해야함
                ref={moveRef}
            >
                <div className="menuButton" onClick={onMenuHref}>
                    전체
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    공지사항
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    Computer Science
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    서버보안
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    Linux
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    Back-End
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    Font-End
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    Server
                </div>
                <div className="menuButton" onClick={onMenuHref}>
                    DataBase
                </div>
            </div>
        </>
    );
};

export default Menu;
