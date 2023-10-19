import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({element})=>{
    const isLoggedIn = useSelector(state => state.admin.isLoggedIn);
    if(!isLoggedIn){
        return <Navigate to="/"/>
    }
    return element;
}
export default ProtectedRoute;