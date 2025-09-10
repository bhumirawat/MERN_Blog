import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'
import logo from '../assets/images/logo.png'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Validation schema
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password field is required'),
  })

  // Initialize form with react-hook-form + zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle form submission
  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      // Save user in redux & navigate
      dispatch(setUser(data.user))
      navigate(RouteIndex)
      showToast('success', data.message)

    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className='w-[400px] p-5'>
        
        {/* Logo */}
        <div className='flex justify-center items-center mb-2'>
          <Link to={RouteIndex}>
            <img src={logo} className='md:w-120 md:h-10 sm:h-8 w-50' />
          </Link>
        </div>

        {/* Heading */}
        <h1 className='text-2xl font-bold mb-5 text-center'>Login Into Account</h1>

        {/* Google Login */}
        <div>
          <GoogleLogin />
          <div className='border my-5 flex justify-center items-center'>
            <span className='absolute bg-white text-sm'>Or</span>
          </div>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password Field */}
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className='mt-5'>
              <Button type="submit" className="w-full">Sign In</Button>
            </div>

            {/* Sign Up Redirect */}
            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
              <p>Don&apos;t have an account?</p>
              <Link className='text-blue-500 hover:underline' to={RouteSignUp}>Sign Up</Link>
            </div>

          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn
