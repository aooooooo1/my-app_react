import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../components/Spinner"
//게시글 클릭시 상세페이지
const ShowPage = () =>{
    const history = useHistory();
    //id사용
    const { id } = useParams();
    //받아온데이터를 state에 저장
    const [post, setPost]=useState(null);
    //상세페이지에서 는 해당id의 게시물으 떠야하므로 db에 get/id 를 보네서 가져온다.
    //스피너
    const [loading, setLoading] = useState(true);
    const getPost = (id)=>{
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setPost(res.data)
            setLoading(false);
        })
    };
    useEffect(()=>{
        getPost(id);
    },[id])//[]안이 바뀌면 useEffect는 실행한다.

    //시간 알아볼수 있게 변견하는 함수
    const date = (e)=>{
        return new Date(e).toLocaleString();
    }

    //로딩이 참이면 로딩 보여주기
    if(loading){
        return <Spinner></Spinner>
    }
    //뒤로가기함수
    const backPage = ()=>{
        history.push('/blogs');
    }
    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>   
                <div>
                    <Link className="btn btn-outline-secondary fw-semibold"
                    to={`/blogs/${id}/edit`}>
                        수정
                    </Link>
                </div>
            </div>
            <small className="text-muted">
                {date(post.createdAt)}
            </small>
            <hr></hr>
            <p>{post.body}</p>
            <hr></hr>
            <div className="d-flex justify-content-center">
                <button onClick={backPage} className="btn btn-light ms-3">뒤로가기</button>
            </div>
        </div>
    )
};
export default ShowPage;