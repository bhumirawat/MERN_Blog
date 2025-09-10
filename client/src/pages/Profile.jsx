import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { setUser } from '@/redux/user/user.slice'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading.jsx'
import { useEffect } from 'react'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'





const Profile = () => {

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()
    const user = useSelector((state) => state.user)

    const {data: userData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id} `,
        {method: 'get', credentials: 'include'},
    )

    const dispatch = useDispatch()

    const formSchema = z.object({
      name: z.string().min(3, 'Name field is required'),
      email: z.string().email(),
      bio: z.string().min(3, 'Bio must be at least 3 characters'),
      password: z.string().optional()
    })
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name:'',
        email:'',
        bio:'',
        password:''
      },
    })
  
    useEffect(() => {
        if(userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio
            })
        }  
    }, [userData])
  
    async function onSubmit(values) {
      try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`,{
            method: 'put',
            credentials: 'include',
            body: formData
            })
      
            const data = await response.json()
            if(!response.ok) {
              return showToast('error', data.message)
            }
            dispatch(setUser(data.user))
            showToast('success', data.message)

            } catch (error) {
              showToast('error', error.message)
          }
    }

    const handleFileselection = (files) => {
        const file = files[0]
        const preview =URL.createObjectURL(file)
        setFile(file)
        setFilePreview(preview)
    }

  if (loading) return <Loading />
  return (
    <Card className='max-w-screen-md mx-auto'>
        
        <CardContent>
        
            <div className='flex justify-center items-center mt-10'>
                
                <Dropzone onDrop={acceptedFiles => handleFileselection(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Avatar className='w-28 h-28 relative group'>
                                <AvatarImage src={filePreview? filePreview: userData?.user?.avatar} />
                                <div className='absolute z-10 w-full h-full top-1/2 
                                left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  
                                bg-black/40 bg-opacity-20 border-2 border-violet-500 rounded-full 
                                group-hover:flex hidden cursor-pointer'>
                                    <IoCameraOutline color='#7c3aed'/>
                                </div>
                            </Avatar>
                        </div>    
                    )}
                </Dropzone>

                
            </div>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        
                        <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your Name"
                                {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your email address"
                                {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter bio"
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your password"
                                {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <Button type="submit" className="w-full">Save Changes</Button>

                    </form>
            </Form>
            </div>
        </CardContent>
    </Card>
    )
}

export default Profile