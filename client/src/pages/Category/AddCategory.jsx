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

const AddCategory = () => {

  // Validation schema using Zod
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long")
  })
  
  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:'',
      slug:''
    },
  })

  // Watch category name input to auto-generate slug
  const categoryName = form.watch('name')
  
  useEffect(() => {
    if(categoryName) {
      const slug = slugify(categoryName, { lower: true })
      form.setValue('slug', slug)
    }
  }, [categoryName])
  
  // Handle form submission
  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
  
      const data = await response.json()
      if(!response.ok) {
        return showToast('error', data.message)
      }

      form.reset()
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div>
      <Card className='pt-5 max-w-screen-sm mx-auto'>
        <CardContent>
          {/* Form with validation and submit handling */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              
              {/* Name input field */}
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

              {/* Slug input field (auto-generated) */}
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

              {/* Submit button */}
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div> 
  )
}

export default AddCategory
