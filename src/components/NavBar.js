import {
    Link , NavLink
} from "react-router-dom"; 
import { useDispatch, useSelector} from 'react-redux';
import { login,logOut } from "../store/adminSlice";
const NvaBar = () => {
    const isLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
    const dispatch = useDispatch();
    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="navbar-nav" style={{flexDirection:'row'}}>
                    <li className="nav-item me-3">
                        <NavLink
                        activeClassName="active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/blogs">Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                        activeClassName="active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/admin">관리자</NavLink>
                    </li>
                    <button className="btn text-white" onClick={()=>{
                        if(isLoggedIn){
                            dispatch(logOut())
                        } else{
                            dispatch(login());
                        }
                    }}>
                        {isLoggedIn ? '로그아웃':'로그인'}
                    </button>
                </ul>  
            </div> 
        </nav>
    )
}
export default NvaBar;