import { Link } from "react-router-dom";
import ShowPost from "../components/showPost";

const AdminPage = () => {
    //기본으로 보여지는 ui
    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>관리자 페이지</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-light">
                        글 작성하기
                    </Link>
                </div>
            </div>
            <ShowPost isAdmin={true}/>
        </div>
    )
};
export default AdminPage;