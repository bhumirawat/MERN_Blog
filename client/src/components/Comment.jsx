import React, { useState } from 'react';
import { FaComments } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { Textarea } from './ui/textarea';
import { RouteSignIn } from '@/helpers/RouteName';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

const Comment = ({ props }) => {

  // State to store the newly added comment
  const [newComment, setNewComment] = useState();

  // Get current logged-in user from Redux store
  const user = useSelector((state) => state.user);

  // Form validation schema using Zod
  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters long")
  });

  // React Hook Form setup with Zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ''
    },
  });

  // Handle comment submission
  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        user: user.user._id
      };

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newValues)
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message); // Show error toast if request fails
      }

      setNewComment(data.comment); // Update local state with new comment
      form.reset(); // Reset form fields
      showToast('success', data.message); // Show success toast

    } catch (error) {
      showToast('error', error.message); // Handle network or unexpected errors
    }
  }

  return (
    <div>
      {/* Comments Header */}
      <h4 className='flex items-center gap-2 text-2xl font-bold'>
        <FaComments className='text-violet-500' /> Comments
      </h4>

      {/* Comment Form for logged-in users */}
      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your comment..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        // Prompt to sign in if user is not logged in
        <Button asChild>
          <Link to={RouteSignIn}>Sign In</Link>
        </Button>
      )}

      {/* Display list of comments */}
      <div className='mt-5'>
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>

    </div>
  );
}

export default Comment;
