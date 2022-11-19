import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = ()=>{
    const params = useParams()
    const [post,setPost] = useState({})
    const [comments,setComments] = useState([])
    const [fetchPostsById,IsLoading,error] = useFetching(async(id)=>{
        const response =await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments,IsComLoading,comError] = useFetching(async(id)=>{
        const response =await PostService.getCommentsByPost(params.id)
        setComments(response.data)
    })

    useEffect(()=>{
        fetchPostsById(params.id)
        fetchComments(params.id)
    },[])
    return(
        <div>
            <h1>Вы открыли страницу поста c id = {params.id}</h1>
            {IsLoading
              ?<Loader/>
              : <div>{post.id}. {post.title}</div>
            }  
            <h1>
                Комментарии
            </h1>  
            {IsComLoading
              ?<Loader/>
              :<div>
                {comments.map(comm=>
                <div key={comm.id} style={{marginTop:15}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
            )}
        </div>
        }
        </div>
        )
    }

export default PostIdPage;