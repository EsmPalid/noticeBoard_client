import axios from "axios";

const authAxios = (url = "/", config) => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryParams = {};

    params.forEach((value, key) => {
        queryParams[key] = value;
    });

    const instance = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true,

        params: {
            ...queryParams,
            language: "ko-KR",
        },
    });

    instance.interceptors.request.use(
        // reqeust를 보내기 전에 config를 수정하는 부분
        // 여기서는 Authorization header에 accessToken 값을 추가한다.
        // 모든 권한이 필요한 Axios Reqeust에서 사용될 예정
        (config) => {
            const accessToken = localStorage.getItem("accessToken");

            config.headers["Authorization"] = `Basic ${accessToken}`;

            return config;
        },
        (error) => {
            // 아직 이해안됨
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },

        async (error) => {
            if (error.response && error.response.status === 401) {
                // 401 Status는 Server에서 Client에게 Authorization이 없음을 알리는
                // Status Code이다.
                // 이 상황에서는 AccessToken이 검증되지 않아서
                // refreshToken을 이용하여 새로운 AccessToken을 생성하는 부분이다.
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    const response = await axios.get(
                        "http://localhost:80/accessToken/createToken",
                        {
                            headers: {
                                Authorization: `Basic ${refreshToken}`,
                            },
                        }
                    );

                    if (response.data) {
                        localStorage.setItem("accessToken", response.data);
                        authAxios(url, config);
                        // 재귀적으로 기존의 Reqeust를 다시 실행해한다.
                        // 가능성은 드물지만 무한루프에 빠질 가능성이 존재한다...*
                        //
                        // Server에서 AccessToken을 생성하고 다시 query를 보냈는데
                        // 인증이 실패할 경우 그렇다. (무한반복)
                        // Ex] Server에서 Token type + Token을 같이 인증에 보낼 경우...
                    } else {
                        // RefreshToken 검증 실패 Logic
                        // localStroage에 저장되어 있는 Token 값을 없앤다.
                        // alert창과 함께 loginPage로 이동시킴

                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessToken");
                        alert("다시 로그인 하세요(RefreshToken 검증 실패)");
                        window.location.replace(
                            "http://localhost:3000/logInPage"
                        );
                    }
                } else {
                    // refreshToken이 없음
                    // login Page로 보내거나 안내함

                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    alert("다시 로그인 하세요(RefreshToken 검증 실패)");
                    window.location.replace("http://localhost:3000/logInPage");
                }
            }
        }
    );

    const response = instance({ url: url, ...config });

    return response;
};

authAxios.get = (url, config) => {
    return authAxios(url, { ...config, method: "GET" });
};
authAxios.post = (url, data, config) => {
    return authAxios(url, { ...config, method: "POST", data });
};

export default authAxios;
