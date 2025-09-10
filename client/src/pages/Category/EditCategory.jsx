import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import slugify from 'slugify'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'

const EditCategory = () => {
  const { category_id } = useParams()

  // Fetch single category details by ID
  const { data: categoryData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/category/show/${category_id}`,
    {
      method: 'GET',
      credentials: 'include',
    },
    [category_id]
  )

  // Validation schema using Zod
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long")
  })

  // Initialize React Hook Form with schema
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: ''
    },
  })

  // Auto-generate slug when name changes
  const categoryName = form.watch('name')
  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true })
      form.setValue('slug', slug, { shouldValidate: true, shouldDirty: true })
    }
  }, [categoryName, form])

  // Pre-fill form fields with existing category data
  useEffect(() => {
    if (categoryData?.category) {
      form.setValue('name', categoryData.category.name)
      form.setValue('slug', categoryData.category.slug)
    }
  }, [categoryData, form])

  // Submit updated category to API
  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv('VITE_API_BASE_URL')}/category/update/${category_id}`,
        {
          method: 'PUT', // update request
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      )

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div>
      <Card className='pt-5 max-w-screen-sm mx-auto'>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >

              {/* Category Name Input */}
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Slug Input */}
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

              {/* Save Button */}
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCategory
