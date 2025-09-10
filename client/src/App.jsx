import React from 'react'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Layout from './Layout/layout'
import Index from './pages/index' 
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import AddBlog from './pages/Blog/AddBlog'
import BlogDetails from './pages/Blog/BlogDetails'
import EditBlog from './pages/Blog/EditBlog'
import {
   RouteAddBlog, 
   RouteAddCategory, 
   RouteBlogDetails, 
   RouteCategoryDetails, 
   RouteBlogEdit, 
   RouteEditCategory, 
   RouteIndex, 
   RouteProfile, 
   RouteSignIn, 
   RouteSignUp, 
   RouteBlog,
   RouteBlogByCategory,
   RouteSearch,
   RouteCommentDetails,
   RouteUser
  } from './helpers/RouteName'
import SingleBlogDetail from './pages/SingleBlogDetail'
import BlogByCategory from './pages/Blog/BlogByCategory'
import SearchResult from './pages/SearchResult'
import Comments from './pages/Comments'
import User from './pages/User'
import AuthRouteProtection from './components/AuthRouteProtection'
import AdminAccess from './components/AdminAccess'

const App = () => {
  return (
    <div>

      <BrowserRouter> 
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />

            {/* Publicly Accessible */}
            <Route path={RouteBlogDetails()} element={<SingleBlogDetail />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />

            {/* Protected from unregistered entity */}
            <Route element={<AuthRouteProtection/>}>
              <Route path={RouteProfile} element={<Profile />} />
              <Route path={RouteAddBlog} element={<AddBlog />} />
              <Route path={RouteBlog} element={<BlogDetails />} />
              <Route path={RouteBlogEdit()} element={<EditBlog />} /> 
              <Route path={RouteCommentDetails} element={<Comments />} />
            </Route>
            
            {/*Accessible only by Admin*/}
            <Route element={<AdminAccess/>}>
              <Route path={RouteAddCategory} element={<AddCategory />} />
              <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
              <Route path={RouteEditCategory()} element={<EditCategory />} />
              <Route path={RouteUser} element={<User />} />
            </Route>

          </Route>

          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App