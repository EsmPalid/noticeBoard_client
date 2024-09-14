# Client 정보

#### 1. Path에 따른 Page

Path에 따른 Page 전환은 react-router-dom를 통해 구현이 가능하다.
  >더 자세히는 BrowserRouter , Routes , Route , Navigate 등의 컴포넌트를 사용함

  - path='/' :  Home page
  - path='/logInPage' : LogIn page
  - path='/signUpPage' : SignUp page
  - path='/createArticle' : CreateArticle page
  - path='/content' : Content page

-----
#### 2. Page별 주요 기능

  - Home page
  
site를 접속할 때 , 가장 처음에 보이게되는 page의 역할을 수행한다.  
logIn , signUp , createArticle , content 등의 Page로 이동할 수 있는 통로 역할을 함
Article , Category 등 server state를 받아와서 보여줌 (미완)
  >해당 Page의 Component는 다른 Page에서 많이 참조하여 재사용한다.  

  - Login page  
  
사용자의 `로그인 기능`을 담당하는 page임
logInId 기억하기 기능이 존재함
  >본래는 logInId , password 찾기 기능도 생각했지만... 현실적으로 생각하면 힘들다.  
  >처음에는 Email(nodemailer 라이브러리)로 해당 기능을 구현하려고 생각했는데 , 지금은 접음

  - SignUp page  
  
회원가입 기능을 담당하는 page  
정규표현식(RegExp)을 사용하여 , logInId , password 패턴 확인 후 , 적절한 message 출력  
logId 및 nickName이 사용가능한지 , server로 요청을 하는 기능

  - CreateArticle page  
  
사용자가 직접 Content를 작성하는 Page(draft.js 라이브러리 사용)
category 등 server state를 받아옴
editorState가 변경될 때 마다 , localStorage에 해당 내용 저장

  - Content page  
  
article, content 등 server state를 받아옴
  >댓글 , 좋아요 , 신고 , 작성자 확인 등등의 미구현 기능 많음  
  >솔직히, 손댈 엄두안남  

----
#### 3. Page별 문제점 , 해야할 일 등

일단보류
