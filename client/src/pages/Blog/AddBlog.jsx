import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import Dropzone from 'react-dropzone'

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

import Editor from '@/components/Editor'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { RouteBlogDetails } from '@/helpers/RouteName'

const AddBlog = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  // Fetch all categories for dropdown
  const { data: categoryData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/category/all-category`,
    { method: 'get', credentials: 'include' }
  )

  const [filePreview, setFilePreview] = useState() // Preview image URL
  const [file, setFile] = useState()               // File for upload

  // Validation schema using Zod
  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    blogContent: z.string().min(3, "Blog must be at least 3 characters long"),
  })

  // Initialize form with schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      blogContent: ''
    },
  })

  // Auto-generate slug when title changes
  const blogTitle = form.watch('title')
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true })
      form.setValue('slug', slug)
    }
  }, [blogTitle])

  // Form submit handler
  async function onSubmit(values) {
    try {
      const newValues = { ...values, author: user.user._id }

      if (!file) {
        showToast('error', 'Feature image required')
        return
      }

      // Prepare form data for API
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(newValues))

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        return showToast('error', data.message)
      }

      // Reset form on success
      form.reset()
      setFile()
      setFilePreview()
      navigate(RouteBlogDetails)
      showToast('success', data.message)

    } catch (error) {
      showToast('error', error.message)
    }
  }

  // Handle file selection & preview
  const handleFileselection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setFilePreview(preview)
  }

  return (
    <div>
      <Card className='pt-5'>
        <CardContent>
          <h1 className='text-2xl font-bold mb-4'>Add Blog</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              {/* Category Dropdown */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              {/* Blog Title */}
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

              {/* Slug (auto-generated from title) */}
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

              {/* Featured Image Upload */}
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

              {/* Blog Content Editor */}
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="md:w-1000px">
                          <Editor
                            initialData={field.value}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              field.onChange(data) // Pass editor content to form
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddBlog
