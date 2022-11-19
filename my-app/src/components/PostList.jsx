import React from "react";
import Postitem from "./Postitem";
import {TransitionGroup,CSSTransition} from "react-transition-group"

const PostList = ({posts,title,remove})=>{
    if(!posts.length){
        return(
        <h1 style={{textAlign:'center'}}>
        Посты не найдены!
         </h1>
    )
    }
    return(
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1> 
            <TransitionGroup> 
                {posts.map((post,index)=>
                <CSSTransition
                key={post.id}
                timeout={500}
                classNames="post"
              >
                <Postitem remove={remove} number = {index + 1} post={post}/>
                </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default PostList;