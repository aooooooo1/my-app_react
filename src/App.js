import { useState } from "react";

function App(){
const[title, setTitle]=useState('a');
const[body, setBody]=useState('a');
const onSubmit = ()=>{
  console.log({title},{body});
}

  return (
    <div className="container">
      <div className="mb-3 ">
        <label className="form-label">Title</label>
        <input 
          className="form-control" 
          value={title} 
          onChange={(e)=>{ //change됬을때 값이 e 이다.
            setTitle(e.target.value);
            console.log(e.target.value);
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
            console.log(e.target.value);
          }}/>
      </div>
      <button onClick={onSubmit} className="btn btn-primary">Post</button>
    </div>
  );
}
export default App;//함수 내보내기 