import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import { Avatar, AvatarImage } from './ui/avatar'
import usericon from '@/assets/images/usericon.png'
import moment from 'moment'

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user)
    const { data, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`,
        { method: 'get', credentials: 'include' }
    )

    if (loading) return <Loading/>
    return (
        <div>
            <h4 className='text-2xl font-bold'>
            {
                
            props.newComment
                ?
                    <span className='me-2'>{data && data.comments.length + 1}</span>
                :
                    <span className='me-2'>{data && data.comments.length}</span>
             } 
            Comments</h4>
            <div className='mt-5'>
                {/* Render new comment if present */}
                {props.newComment &&
                    <div className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={user?.user?.avatar || usericon} />
                        </Avatar>
                        <div>
                            <p className='font-bold'>{user?.user?.name}</p>
                            <p>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {props.newComment?.comment}
                            </div>
                        </div>
                    </div>
                }
                {/* Render existing comments */}
                {data && data.comments.length > 0
                && data.comments.map(comment => (
                    <div key={comment._id} className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={comment?.user.avatar || usericon} />
                        </Avatar>
                        <div>
                            <p className='font-bold'>{comment?.user.name}</p>
                            <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {comment?.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentList












