import { Redirect,Route } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({component,path,key})=>{
    const isLoggedIn = useSelector(state => state.admin.isLoggedIn);
    if(!isLoggedIn){
        return <Redirect to="/"/>
    }
    return (
        <Route component={component} path={path} key={key} exact/>
    );
}
export default ProtectedRoute;