import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import Loading from './Loading'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { Link } from 'react-router-dom'

const RelatedBlog = ({ props }) => {
    const { data, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
        { method: 'get', credentials: 'include' }
    )

    if(loading) return <Loading/>
  return (
    <div >
        <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>
        <div>
            {data && data.relatedBlog.length > 0
                ?
                data.relatedBlog.map(blog => {
                    return(
                        <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                        <div className='flex item-center gap-2 mb-3'>
                            <img className='w-[100px] h-[69px] object-cover rounded-md' src={blog.featuredImage}/>
                            <h4 className='line-clamp-2 font-semibold py-1.5' style={{ fontSize: '1.2rem' }} >{blog.title}</h4>
                        </div>
                        </Link>
                    )
                })
                :
                <div>
                    No Related Blog
                </div>
            }
        </div>
    </div>
  )
}

export default RelatedBlog