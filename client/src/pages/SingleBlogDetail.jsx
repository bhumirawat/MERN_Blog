import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import LikeCount from '@/components/LikeCount'
import Loading from '@/components/Loading'
import RelatedBlog from '@/components/RelatedBlog'
import { Avatar } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { AvatarImage } from '@radix-ui/react-avatar'
import { decode } from 'entities'
import moment from 'moment'
import React from 'react'
import { useParams } from 'react-router-dom'
import usericon from '@/assets/images/usericon.png'

const SingleBlogDetail = () => {
  const { blog, category } = useParams()

  // Fetch blog details by blog ID
  const { data, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`,
    { method: 'get' },
    [blog, category]
  )

  if (loading) return <Loading />

  return (
    <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>
      {data && data.blog &&
        <>
          {/* Blog Details Section */}
          <div className='border rounded md:w-[70%] w-full p-5'>
            <h1 className='text-2xl font-bold mb-5'>{data.blog?.title}</h1>

            {/* Author Info + Like/Comment Count */}
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <Avatar>
                  <AvatarImage src={data.blog?.author?.avatar || usericon} />
                </Avatar>
                <div>
                  <p className='font-bold'>{data.blog?.author?.name || "Unknown Author"}</p>
                  <p>Date: {moment(data.blog?.createdAt).format('DD-MM-YYYY')}</p>
                </div>
              </div>

              <div className='flex items-center gap-5'>
                <LikeCount props={{ blogid: data.blog._id }} />
                <CommentCount props={{ blogid: data.blog._id }} />
              </div>
            </div>

            {/* Featured Image */}
            <div className='my-5'>
              <img src={data.blog.featuredImage} className='rounded' />
            </div>

            {/* Blog Content */}
            <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }} />

            {/* Comments Section */}
            <div className='border-t mt-5 pt-5'>
              <Comment props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      }

      {/* Related Blogs Section */}
      <div className='border rounded md:w-[30%] p-5'>
        <RelatedBlog props={{ category: category, currentBlog: blog }} />
      </div>
    </div>
  )
}

export default SingleBlogDetail
