import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../components/Spinner";
import { bool } from "prop-types";
import Paigination from "./Paigination";
//모든 게시글을 가져옵니다.
const ShowPost = ({isAdmin})=>{
    const history = useHistory();
    //제목 가져오기
    const [posts, setPosts] = useState([]);
    
    //관리자 모드 일때는 cbP가 다보여야한다.
    const getPosts = (page = 1) => {  
        let para = {
            _page : page,
            _limit : 5,
            _sort : 'id',
            _order : 'desc',
        }
        if(!isAdmin){
            para = {...para , checkboxPublish : true}
        }
        axios.get(`http://localhost:3001/posts`,{
            params:para //키와 벨류가 똑같으면 하나만 써도 된다.
        }).then((res)=>{
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
    const renderPost = ()=>{
        return (
            posts.map((value)=>{
                return (
                    <Card key={value.id} title1={value.title}
                        onClick1={()=>history.push(`/blogs/${value.id}`)}>
                        {isAdmin ?
                            <div>
                                <button className="btn btn-danger btn-sm"
                                onClick={(e)=>deleteCard(e, value.id)}>삭제하기</button>
                            </div>
                        : null}
                    </Card>
                );
            })
        );
    };
    //모든 게시글 불러오기.
    return (
        <div>
            {renderPost()}
            <Paigination/>
        </div>
    )
};
ShowPost.propTypes = {
    isAdmin : bool
};
ShowPost.defaultProps = {
    isAdmin: false
}
export default ShowPost;