import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../components/Spinner";

const ListPage = () => {
    const history = useHistory();
    
    //제목 가져오기
    const [posts, setPosts] = useState([]);
    const getPosts = () => { 
        axios.get('http://localhost:3001/posts').then((res)=>{
            setPosts(res.data);
            setLoading(false);
        })
    }
    useEffect(()=>{
        getPosts();
    },[])

    // 삭제하기 버튼 이벤트
    const deleteCard = (e , id)=>{
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
            setPosts(survivor=>survivor.filter(posts=>posts.id !== id));
        })
    }

    //스피너 생성
    const [loading, setLoading] = useState(true);
    //게시글 나타내는 함수
    const showPost = ()=>{
        if(loading){
            return(
                <Spinner/>
            )
        }
        if(posts.length === 0){
            return(
            <div>게시글이 없습니다. 글을 작성해 주세요!</div>
            );
        }
        //모든 게시글 불러오기.
        return posts.filter(posts=>posts.checkboxPublish).map((value)=>{
            return (
                <Card key={value.id} title1={value.title}
                    onClick1={()=>history.push(`/blogs/${value.id}`)}>
                    <div>
                        <button className="btn btn-danger btn-sm"
                        onClick={(e)=>deleteCard(e, value.id)}>삭제하기</button>
                    </div>
                </Card>
            );
        });
    }

    //기본으로 보여지는 ui
    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        create now
                    </Link>
                </div>
            </div>
            {showPost()}
        </div>
    )
};
export default ListPage;