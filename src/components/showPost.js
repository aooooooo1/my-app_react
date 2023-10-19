import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import propTypes from "prop-types";
import Paigination from "./Paigination";
import {v4 as uuidv4} from 'uuid';
import useToast from "../hooks/toast";
import { useSelector } from "react-redux";
//모든 게시글을 가져옵니다.
const ShowPost = ({isAdmin})=>{
    const history = useNavigate();
    //제목 가져오기
    const [posts, setPosts] = useState([]);
    //현제 페이지 업데이트
    const [currentPage, setCureentPage] = useState(1);
    //게시글만틈 페이지 업데이트
    const [numOfPage , setNumOfPage]= useState(0);
    const [numOfPost , setNumOfPost]= useState(0);
    //검색 벨류 
    const [searchText , setSearchText]= useState('');
    //토스트
    const {addToast} = useToast([]);
    //에러
    const [er,setEr]=useState('');
    //주소창에서 ? 뒤에 숫자 부분 가져오기
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const pageParam = params.get('page');
    //리덕스 불러오기
    const toasts1 = useSelector((state)=>{
        return state.toast.toasts;
    });
    const limit = 5;
    //페이지 갯수는 게시글 나누기 5로 하였다. 2나옴
    useEffect(()=>{
        setNumOfPage(Math.ceil(numOfPost / limit));
    },[numOfPost])

    const getPostsA = (page)=>{
        history.push(`${location.pathname}?page=${page}`)
        getPosts(page);
    }

    //관리자 모드 일때는 cbP가 다보여야한다.
    const getPosts = (page) => {  
        let para = {
            _page : page,
            _limit : limit, 
            _sort : 'id',
            _order : 'desc',
            title_like : searchText,
        }
        if(!isAdmin){
            para = {...para , checkboxPublish : true}
        }
        axios.get(`http://localhost:3001/posts`,{
            params:para //키와 벨류가 똑같으면 하나만 써도 된다.
        }).then((res)=>{
            setNumOfPost(res.headers['x-total-count']);
            setPosts(res.data);
            setLoading(false);
        })
    }
    useEffect(()=>{
        const getPosts = (page) => {  
            let para = {
                _page : page,
                _limit : limit, 
                _sort : 'id',
                _order : 'desc',
            }
            if(!isAdmin){
                para = {...para , checkboxPublish : true}
            }
            axios.get(`http://localhost:3001/posts`,{
                params:para //키와 벨류가 똑같으면 하나만 써도 된다.
            }).then((res)=>{
                setNumOfPost(res.headers['x-total-count']);
                setPosts(res.data);
                setLoading(false);
            }).catch((e)=>{
                setLoading(false);
                setEr('server wrong');
                addToast({
                    text:'서버쪽에 문제가 생긴거 같아요..',
                    type:'danger',
                })
            })
        }
        setCureentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    },[pageParam, isAdmin])

    // 삭제하기 버튼 이벤트
    const deleteCard = (e , id)=>{
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
            setPosts(survivor=>survivor.filter(posts=>posts.id !== id));
            addToast({
                text:'성공적으로 삭제가 완료 되었습니다.',
                type:'success',
                id:uuidv4(),
            }).catch(e=>{
                addToast({
                    text:'서버문제로 삭제할 수 없습니다.',
                    type:'danger',
                })
            })
        })
    }

    //스피너 생성
    const [loading, setLoading] = useState(true);
    if(loading){
        return(
            <Spinner/>
        )
    }
    //에러
    if(er){
        return <div>{er}</div>
    }
    if(posts.length === 0){
        return(
            <>
            <input type="text" className="form-control" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyUp={getPosts}/>
            <hr/> 
            <div>게시글이 없습니다.</div>
            </>
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
            {/* <Toast toasts={toast} deleteToast={deleteToast}/> */}
            <input type="text" className="form-control" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyUp={getPosts}/>
            <hr/> 
            {renderPost()}
            { numOfPage > 1 && <Paigination currentPage={currentPage} numberOfPages={numOfPage} onClickGetPosts={getPostsA}/>}
        </div>
    )
};
ShowPost.propTypes = {
    isAdmin : propTypes.bool
};
ShowPost.defaultProps = {
    isAdmin: false
}
export default ShowPost;