import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ListPage = () => {
    const history = useHistory();
    
    //제목 가져오기
    const [posts, setPosts] = useState([]);
    const getPosts = () => { 
        axios.get('http://localhost:3001/posts').then((res)=>{
            setPosts(res.data);
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
            {posts.map((value)=>{
                return (
                    <Card key={value.id} title1={value.title}
                    onClick1={()=>history.push('/blogs/edit')}>
                        <div>
                            <button className="btn btn-danger btn-sm"
                            onClick={(e)=>deleteCard(e, value.id)}>삭제하기</button>
                        </div>
                    </Card>
                    );
            })}
        </div>
    )
};
export default ListPage;