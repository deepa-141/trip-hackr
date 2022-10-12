import Header from './components/Header';
import React, { useEffect } from 'react';
import {Route,Routes} from 'react-router-dom';
import Auth from './components/Auth';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import { Homee } from './components/Homee/Homee';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return <React.Fragment>
    <header>
      <Header/>
    </header>

    <main>
       <Routes>
       <Route exact path="/" element={<Homee />} />
       {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
        )}
       </Routes>
    </main>
  </React.Fragment>
}

export default App;
