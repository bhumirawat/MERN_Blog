import React from 'react'
import { Link } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import Loading from './Loading'
import { RouteBlogDetails } from '@/helpers/RouteName'

const RelatedBlog = ({ props }) => {
    // Fetch related blogs based on category and current blog ID
    const { data, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
        { method: 'get', credentials: 'include' }
    )

    // Show loading spinner while fetching data
    if (loading) return <Loading />

    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>

            <div>
                {data && data.relatedBlog.length > 0 ? (
                    // Map over related blogs and display each
                    data.relatedBlog.map(blog => (
                        <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                            <div className='flex items-center gap-2 mb-3'>
                                {/* Blog thumbnail */}
                                <img
                                    className='w-[100px] h-[69px] object-cover rounded-md'
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                />
                                {/* Blog title */}
                                <h4
                                    className='line-clamp-2 font-semibold py-1.5'
                                    style={{ fontSize: '1.2rem' }}
                                >
                                    {blog.title}
                                </h4>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Show message if no related blogs
                    <div>No Related Blog</div>
                )}
            </div>
        </div>
    )
}

export default RelatedBlog
