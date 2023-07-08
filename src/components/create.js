import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
const CreateBlog=()=>{
    const [title,setTitle]=useState();
    const [files,setFiles]=useState();
    const [content,setContent]=useState();
    const [alert,setAlert]=useState();
    const [redirect,setredirect]=useState();
    const newBlog = async (e) => {
        e.preventDefault();
      
        if (title === '' || !files || content === '') {
          setAlert('Fill All the Fields');
        } else {
          const data = new FormData();
          data.set('title', title);
          data.set('content', content);
          data.set('file', files[0]);
      
          try {
            const response = await fetch('http://localhost:8000/createBlog', {
              method: 'POST',
              body: data,
              credentials:'include',
            });
           console.log(await response.json()) ;
    //   console.log(files[0],title,content)
            if (response.status === 200) {setredirect(true);
              setFiles('');
              setTitle('');
              setContent('');
              setAlert('');
            }
          } catch (error) {
            console.log('Error:', error);
          }
        }
      };
      if(redirect){
        return <Navigate to='/blog'/>
      }

    return(
        <div>
            <h3>Create a new Blog</h3>
            <div className="create">
                <input type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                <input type="file"  onChange={(e)=>{setFiles(e.target.files)}} />
                <ReactQuill value={content} onChange={newValue=>{setContent(newValue)}}/>
            </div>
            <button className="log" onClick={newBlog}>Create</button>
            <p>{alert}</p>
        </div>
    )
}
export default CreateBlog;