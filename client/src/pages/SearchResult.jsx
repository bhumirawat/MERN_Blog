import BlogCard from '@/components/BlogCard'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')

  // Fetch blogs based on search query
  const { data: blogData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`,
    {
      method: 'get',
      credentials: 'include'
    }
  )

  return (
    <>
      {/* Page Header */}
      <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
        <h4>Search Result For: {q}</h4>
      </div>

      {/* Blog Search Results */}
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

export default SearchResult
