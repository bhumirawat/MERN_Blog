// ---------- Auth Routes ----------
export const RouteIndex = "/";                  // Home Page
export const RouteSignIn = "/sign-in";          // Sign-in Page
export const RouteSignUp = "/sign-up";          // Sign-up Page
export const RouteProfile = "/profile";         // User Profile


// ---------- Category Routes ----------
export const RouteCategoryDetails = "/categories";    // All categories
export const RouteAddCategory = "/category/add";      // Add category
export const RouteEditCategory = (category_id) => {
    if (category_id) {
        return `/category/edit/${category_id}`;
    }else{
        return `/category/edit/:category_id`;
    }
}

// ---------- Blog Routes ----------
export const RouteBlog = "/blog-details";       // Blog details (base)
export const RouteAddBlog = "/blog/add";        // Add blog

export const RouteBlogEdit = (blogid) => {
    if (blogid){
        return `/blog/edit/${blogid}`
    } else {
        return `/blog/edit/:blogid`
    }
}

export const RouteBlogDetails  = (category, blog) => {
    if (!category || !blog){
        return `/blog/:category/:blog`
    } else{
        return `/blog/${category}/${blog}`
    }
}

export const RouteBlogByCategory  = (category) => {
    if (!category){
        return `/blog/:category`
    } else{
        return `/blog/${category}`
    }
}

// ---------- Search Route ----------
export const RouteSearch  = (q) => {
    if(q){
        return `/search?q=${q}`
    }else {
        return `/search`
    }
}


// ---------- Other Routes ----------
export const RouteCommentDetails = '/comments';   // Comments page
export const RouteUser = '/users';                // Users page