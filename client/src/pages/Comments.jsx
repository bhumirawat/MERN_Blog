import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { showToast } from '@/helpers/showToast'
import { deleteData } from '@/helpers/handleDelete'
import { useSelector } from 'react-redux'

const Comments = () => {
    const [refreshData, setRefreshData] = useState(false)
    const user = useSelector(state => state.user)

    // ✅ Choose endpoint based on user role (SAME AS BLOGDETAILS.JSX)
    const endpoint = user.isLoggedIn 
        ? (user.user.role === 'admin' ? "/comment/get-all-comment" : "/comment/get-my-comments")
        : "/comment/get-all-comment";

    const {data, loading, error} = useFetch(
        `${getEnv('VITE_API_BASE_URL')}${endpoint}`,
        {
            method:'get',
            credentials: 'include'
        },
        [refreshData, user.isLoggedIn, user.user?.role] // Re-fetch when auth state or role changes
    )

    const handleDelete = async (id) => {
        const response = await deleteData(
        `${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)
        if(response){
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted')
        }else {
            showToast('error', 'Data not deleted')
        }
    }


  if(loading) return <Loading/>
  return (
    <div>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Blog</TableHead>
                        <TableHead>Commented By</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.comments && data.comments.length > 0 ? (
                            data.comments.map(comment => (
                                <TableRow key={comment._id}>
                                    <TableCell>{comment?.blogid?.title || 'Unknown Blog'}</TableCell>
                                    <TableCell>{comment?.user?.name || 'Unknown User'}</TableCell>
                                    <TableCell>{comment?.comment}</TableCell>
                                    <TableCell className='flex gap-3'>
                        
                                            <Button  
                                                onClick={() => handleDelete(comment._id)}
                                                variant='outline' 
                                                className='hover:bg-violet-500 hover:text-white'
                                            >
                                                <FaRegTrashAlt/>
                                            </Button>
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan='4'>
                                    Data not found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}

export default Comments