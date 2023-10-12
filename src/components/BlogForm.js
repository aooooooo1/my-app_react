import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { bool, PropTypes } from "prop-types";


const BlogForm = ({modify}) =>{
    //페이지 이동 함수 생성
    const history = useHistory();
    //path의 'id'정보 가져오기
    const {id} = useParams(); 
    //서버로 내용들을 보넴.
    const[title, setTitle]=useState('');
    const[body, setBody]=useState(''); 

    //수정시 데이터 가져오기(한번만 실행)
    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setTitle(res.data.title);
            setBody(res.data.body);
        })
    },[id])

    const onSubmit = ()=>{
        //modify가 true일 경우
        if(modify){
            axios.patch(`http://localhost:3001/posts/${id}`,{
                title:title,
                body:body,
            }).then((res)=>{
                console.log(res);
            });
        } else{
            axios.post('http://localhost:3001/posts',{
                title : title, //title 만 적어도 된다. 
                body: body,
                createdAt: Date.now()
            }).then(()=>{
                history.push('/blogs');
            });
        }
    }    
    //뒤로 이동
    const backPage = ()=>{
        history.goBack();
    }
    


    return(
        <div>
            <h2 className="mt-3">{modify ? '글 수정하기' : '글 작성하기'}</h2>
            <div className="mb-3">
                <label className="form-label">제목</label>
                <input 
                className="form-control" 
                value={title} 
                onChange={(e)=>{ //change됬을때 값이 e 이다.
                    setTitle(e.target.value);
                    //console.log(e.target.value);
                }}/>
            </div>
            <div className="mb-3 ">
                <label className="form-label">내용</label>
                <textarea 
                rows="7"
                className="form-control" 
                value={body} 
                onChange={(e)=>{ //change됬을때 값이 e 이다.
                    setBody(e.target.value);
                    //console.log(e.target.value);
                }}/>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={onSubmit} className="btn btn-primary">{modify ? '수정' : '게시'}</button>
                <button onClick={backPage} className="btn btn-light ms-3">뒤로가기</button>
            </div>
        </div>
    );
}
//modify는 항상 참,거짓으로 받는다.
BlogForm.propType = {
    modify: bool
}
//modify의 기본 prop는 false이다.
BlogForm.defaultProps = {
    modify: false
}

export default BlogForm;