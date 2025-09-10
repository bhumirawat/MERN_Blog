import React from 'react'
import { useParams } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";

import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'

const BlogByCategory = () => {
  const { category } = useParams() // Get category from route params

  // Fetch blogs by category
  const { data: blogData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`,
    { method: 'get', credentials: 'include' },
    [category] // Refetch when category changes
  )

  // Show loading spinner
  if (loading) return <Loading />

  return (
    <>
      {/* Category Header */}
      <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
        <BiCategory />
        <h4 className='text-2xl'>{blogData && blogData.categoryData?.name}</h4>
      </div>

      {/* Blog List */}
      <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map(blog => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div>Data Not Found</div>
        )}
      </div>
    </>
  )
}

export default BlogByCategory
