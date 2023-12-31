import {
BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; 
import NvaBar from "./components/NavBar";
import routes from "./routes";
import Toast from "./components/Toast";
import useToast from "./hooks/toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./protectedRoute";


function App(){
  const toasts = useSelector(state => state.toast.toasts);
  const  {deleteToast} = useToast();
  return (
    <Router>
      <Toast toasts={toasts} deleteToast={deleteToast}/>
      {/* navbar */}
      <NvaBar/>
      <div className="container mt-3">
        <Routes> 
          {routes.map((route)=>{ 
            //값은 리턴해주고 루트 속성중에 component가 있다.여기에 page.js의 이름이 들어간다.
            return <Route key={route.path} path={route.path} component={route.admin ? <ProtectedRoute 
              component={route.element}
              /> : route.element}/>
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;//함수 내보내기 