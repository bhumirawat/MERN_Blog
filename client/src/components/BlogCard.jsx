import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/usericon.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ blog }) => {
  const user = useSelector((state) => state.user)

  return (
    <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
        <Card className="pt-5">
        <CardContent>
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar>
                <AvatarImage src={blog?.author?.avatar || usericon} />
                </Avatar>
                <span>{blog?.author?.name || "Unknown Author"}</span>
            </div>

            {blog?.author?.role === "admin" && (
                <Badge variant="outline" className="bg-violet-500">Admin</Badge>
            )}
            </div>

            <div className='my-2'>
                <img src ={blog?.featuredImage} className='rounded'/>
            </div>

            <div className="mt-3">
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaRegCalendarAlt />
                <span>{moment(blog?.createdAt).format('DD-MM-YYYY')}</span>
            </p>
            <h2 className="text-2xl font-bold line-clamp-2">{blog?.title || "Untitled"}</h2>
            </div>
        </CardContent>
        </Card>
    </Link>
  )
}

export default BlogCard
