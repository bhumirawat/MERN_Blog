import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import slugify from 'slugify'
import { decode } from 'entities'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import Loading from '@/components/Loading'

import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'

const EditBlog = () => {
  const { blogid } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  // ✅ Validation schema
  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    blogContent: z.string().min(3, "Blog must be at least 3 characters long")
  })

  // ✅ React Hook Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', slug: '', blogContent: '' },
  })

  // Auto-generate slug from blog title
  const blogTitle = form.watch('title')
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true })
      form.setValue('slug', slug)
    }
  }, [blogTitle])

  // ✅ Fetch categories
  const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })

  // ✅ Fetch blog data to edit
  const { data: blogData, loading: blogLoading } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/edit/${blogid}`,
    { method: 'get', credentials: 'include' },
    [blogid]
  )

  const [filePreview, setFilePreview] = useState()
  const [file, setFile] = useState()

  // ✅ Pre-fill form when blog data is loaded
  useEffect(() => {
    if (blogData) {
      setFilePreview(blogData.blog.featuredImage)
      form.setValue('category', blogData.blog.category._id)
      form.setValue('title', blogData.blog.title)
      form.setValue('slug', blogData.blog.slug)
      form.setValue('blogContent', decode(blogData.blog.blogContent))
    }
  }, [blogData])

  // ✅ Handle form submit
  async function onSubmit(values) {
    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/update/${blogid}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      })

      const data = await response.json()
      if (!response.ok) {
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

  // ✅ Handle featured image selection
  const handleFileselection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setFilePreview(preview)
  }

  if (blogLoading) return <Loading />

  return (
    <div>
      <Card className='pt-5'>
        <CardContent>
          <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              {/* Category Field */}
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

              {/* Title Field */}
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Slug Field */}
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Featured Image */}
              <div className='mb-3 block'>
                <span className='mb-2'>Featured Image</span>
                <Dropzone onDrop={acceptedFiles => handleFileselection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
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

              {/* Blog Content */}
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="w-full">
                          <Editor
                            initialData={field.value}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              field.onChange(data) // store HTML string only
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
