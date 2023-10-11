import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import NvaBar from "./components/NavBar";
import routes from "./routes";


function App(){
  return (
    <Router>
      {/* navbar */}
      <NvaBar/>
      <div className="container mt-3">
        <Switch> 
          {/* 객체배열에 map으로 각 value를 꺼네서 그 value의 프로퍼티속성을 사용한다. */}
          {routes.map((route)=>{ 
            //값은 리턴해주고 루트 속성중에 component가 있다.여기에 page.js의 이름이 들어간다.
            return <Route key={route.path} exact path={route.path} component={route.component}/>
          })}
        </Switch>
      </div>
    </Router>
  );
}
export default App;//함수 내보내기 