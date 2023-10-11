import { useState } from "react";
import axios from "axios";

const BlogForm = () =>{
    const[title, setTitle]=useState('');
    const[body, setBody]=useState(''); 
    const onSubmit = ()=>{
        console.log({title},{body});
        axios.post('http://localhost:3001/posts',{
            title : title, //title 만 적어도 된다. 
            body: body
        }); 
    }    
    return(
        <div>
            <h2 className="mt-3">글 작성하기</h2>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                className="form-control" 
                value={title} 
                onChange={(e)=>{ //change됬을때 값이 e 이다.
                    setTitle(e.target.value);
                    //console.log(e.target.value);
                }}/>
            </div>
            <div className="mb-3 ">
                <label className="form-label">Body</label>
                <textarea 
                rows="7"
                className="form-control" 
                value={body} 
                onChange={(e)=>{ //change됬을때 값이 e 이다.
                    setBody(e.target.value);
                    //console.log(e.target.value);
                }}/>
            </div>
            <button onClick={onSubmit} className="btn btn-primary">Post</button>
        </div>
    );
}
export default BlogForm;