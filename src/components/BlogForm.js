import { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory, useParams } from "react-router-dom";
import { bool, PropTypes } from "prop-types";


const BlogForm = ({modify}) =>{
    //페이지 이동 함수 생성
    const history = useHistory();
    //path의 'id'정보 가져오기
    const {id} = useParams(); 
    //서버로 내용들을 보넴.
    const[title, setTitle]=useState('');
    const[body, setBody]=useState(''); 
    const [error, setError] = useState(null); 
    //원레 내용들이 바뀌면 수정버튼 활성화되게 한다.
    const[originTitle, setOriginTitle]=useState('');
    const[originBody, setOriginBody]=useState(''); 
    //checkbox
    const [checkbox1, setCheckbox1] = useState(false);
    const [OriCheckbox1, setOriCheckbox1] = useState();

    //수정시 데이터 가져오기(한번만 실행)
    useEffect(()=>{
        if(modify){
            axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
                setOriginTitle(res.data.title);
                setOriginBody(res.data.body);
                setCheckbox1(res.data.checkboxPublish)
                setOriCheckbox1(res.data.checkboxPublish);
            }).catch((error) => {
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            });
        }
    }, [id, modify]); 

    //불린을 반환하는 함수
    const isEdit = ()=>{
        //원레 글과 지금 글이 다르면 참. 아니면 거짓. 초기값은 거짓
        return title !== originTitle || body !== originBody || checkbox1 !== OriCheckbox1;
    }

    const onSubmit = ()=>{
        //modify가 true일 경우
        if(modify){
            axios.patch(`http://localhost:3001/posts/${id}`,{
                title:title,
                body:body,
                checkboxPublish: checkbox1,
            }).then((res)=>{
                console.log(res);
                history.push(`/blogs/${id}`);
            });
        } else{
            axios.post('http://localhost:3001/posts',{
                title : title, //title 만 적어도 된다. 
                body: body,
                checkboxPublish: checkbox1,
                createdAt: Date.now()
            }).then(()=>{
                history.push('/admin');
            });
        }
    }    
    //뒤로 이동
    const backPage = ()=>{
        history.goBack();
    }
    // const backPage2 = ()=>{
    //     if(modify){
    //         history.push(`/blogs/${id}`);
    //     } else{
    //         history.push('/blogs')
    //     }
    // }
    
    //체크박스 온오프여부
    const check = (e)=>{
        console.log(e.target.checked);
        setCheckbox1(e.target.checked);
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
            {/* 체크박스 */}
            <div className="form-check">
                <input type="checkBox" className="form-check-input" id="ch" checked={checkbox1} onChange={check}/>
                <label className="form-check-lable" for="ch" >공개</label>
            </div>
            {/* 수정버튼 */}
            <div className="d-flex justify-content-center">
                <button onClick={onSubmit} className="btn btn-primary"
                    disabled={modify && !isEdit()}>{modify ? '수정' : '게시'}</button>
                <button onClick={backPage} className="btn btn-light ms-3">뒤로가기1</button>
            </div>
        </div>
    );
}
//modify는 항상 참,거짓으로 받는다.
BlogForm.propTypes = {
    modify: bool
}
//modify의 기본 prop는 false이다.
BlogForm.defaultProps = {
    modify: false
}

export default BlogForm;