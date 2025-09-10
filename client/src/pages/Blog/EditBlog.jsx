import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import slugify from 'slugify'
import { decode } from 'entities'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading'


const EditBlog = () => {

  const {blogid} = useParams();
  const navigate = useNavigate()
  const  user = useSelector((state => state.user));
    
    const formSchema = z.object({
          category: z.string().min(3, "Category must be at least 3 characters long"),
          title: z.string().min(3, "Title must be at least 3 characters long"),
          slug: z.string().min(3, "Slug must be at least 3 characters long"),
          blogContent: z.string().min(3, "Blog must be at least 3 characters long")
        })
      
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            title:'',
            slug:'',
            blogContent:''
          },
        })

    const blogTitle = form.watch('title')
    useEffect(() => {
        if(blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle])


    const {data: categoryData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
        method:'get',
        credentials: 'include'
    },)

      const {data:blogData, loading:blogLoading} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/edit/${blogid}`,{
        method:'get',
        credentials: 'include'
    }, [blogid])

    
    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()

    useEffect(() => {
      if(blogData) {
          setFilePreview(blogData.blog.featuredImage)
          form.setValue('category', blogData.blog.category._id)
          form.setValue('title', blogData.blog.title)
          form.setValue('slug', blogData.blog.title)
          form.setValue('slug', blogData.blog.slug)
          form.setValue('blogContent', decode(blogData.blog.blogContent))
      }
    }, [blogData])

    
    async function onSubmit(values) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('data', JSON.stringify(values))  // ✅ Fixed typo
    
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/update/${blogid}`,{
            method: 'put',
            credentials: 'include',
            body: formData
        })
          
        const data = await response.json()
        if(!response.ok) {
            return showToast('error', data.message)
        }
        
        form.reset()
        setFile()
        setFilePreview()
        navigate(RouteBlogDetails)
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

  if(blogLoading) return <Loading />
  return (
        <div>
            <Card className='pt-5'>
            
                <CardContent>
                  <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {categoryData?.category?.length > 0 &&
                                            categoryData.category.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>
                                                {category.name}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>


                        <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter blog title"
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
                            name="slug"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                <Input placeholder="Slug"
                                {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                        
                        <div className='mb-3 block'>
                            <span className='mb-2'>Featured Image</span>
                        <Dropzone onDrop={acceptedFiles => handleFileselection(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                                    {filePreview ? (
                                        <img src={filePreview} alt="Preview" className="w-36 h-28 object-cover" />
                                    ) : (
                                        <p className="text-center">Drag & drop or click to upload</p>
                                    )}
                                    </div>

                                </div>    
                            )}
                        </Dropzone>
                        </div>

                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="blogContent"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Content</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                        {/* <Editor props={{ initialData: '',onChange: handleEditorData
                                            }}
                                        /> */}
                                        <Editor
                                            initialData={field.value}
                                            onChange={(event, editor) => {
                                            const data = editor.getData();
                                            field.onChange(data); // Pass only the string!
                                            }}
                                        />
                                        </div>
                                    </FormControl>  
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full">Save</Button>

                    </form>
                    </Form>
                </CardContent>

            </Card>
        </div> 
    )
}

export default EditBlog