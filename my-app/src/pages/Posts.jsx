import React, { useRef, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import PostList from '../components/PostList.jsx';
import'../styles/App.css';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import { useEffect } from 'react';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching.js';
import { getPageCount,getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts,setPosts] = useState([])
  const [filter,setFilter] = useState({sort: '',query: ''})
  const [modal,setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query)
  const [totalCount,setTotalCount] = useState(0)
  const [limit,setLimit] = useState(10)
  const [totalPages,setTotalPages] = useState(0)
  const [page,setPage] = useState(1)
  const lastElement = useRef()

 


  const [fetchPosts,isPostsLoading,postError] = useFetching(async()=>{
    const response = await PostService.getAll(limit,page)
    setPosts([...posts,...response.data])
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount,limit))
  })

  useObserver(lastElement,page<totalPages,isPostsLoading,()=>{
    setPage(page +1)
  })

  
  
  useEffect(() =>{ 
    fetchPosts(limit,page)
    },[page, limit] )


  const createPost = (newPost) =>{
    setPosts([...posts,newPost])
    setModal(false)
  }

  
  // Получаем пост из дочернего компонента
  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) =>{
    setPage(page)
  }


  return (
    <div className="App">
      <button onClick={fetchPosts}> Get Post</button>
      <MyButton style = {{marginTop:30}} onClick={()=>setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible = {modal} setVisible = {setModal}>
        <PostForm create = {createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange = {value =>setLimit(value)}
        defaultValue ="Количество элементов на странице"
        options={[
          {value:5, name:'5'},
          {value:10, name:'10'},
          {value:25, name:'25'},
          {value:-1, name:'Показать все'}
        ]}
      />
      {postError &&
      <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove = {removePost} posts={sortedAndSearchedPosts} title = "Посты про JS"/>
      <div ref={lastElement} style={{height:20,background:'red'}}></div>
      {isPostsLoading &&
      <div style={{display:'flex',justifyContent:'center', marginTop:50}}><Loader/></div>
      }
      <Pagination 
      page={page} 
      changePage={changePage} 
      totalPages={totalPages}> 
      </Pagination>
    </div>
  );
}

export default Posts;
