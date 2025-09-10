import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { SlLike } from "react-icons/sl";
import { IoThumbsUp } from "react-icons/io5";
import { useSelector } from 'react-redux';

const LikeCount = ({ props }) => {
  // State to store total like count and whether current user has liked the blog
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Get current logged-in user from Redux store
  const user = useSelector(state => state.user);

  // Fetch initial like count and user's like status for the blog
  const { data: blogLikeCount, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
    { method: 'get', credentials: 'include' }
  );

  // Update local state when fetch data changes
  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likecount);
      setHasLiked(blogLikeCount.isUserliked);
    }
  }, [blogLikeCount]);

  // Handle like button click
  const handleLike = async () => {
    try {
      // Prevent like action if user is not logged in
      if (!user.isLoggedIn) {
        return showToast('error', 'Please login into your account.');
      }

      // Send like/unlike request to backend
      const response = await fetch(
        `${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`,
        {
          method: 'post',
          credentials: 'include',
          headers: { 'Content-type': "application/json" },
          body: JSON.stringify({ user: user?.user?._id, blogid: props.blogid })
        }
      );

      if (!response.ok) {
        showToast('error', response.statusText); // Show error if request fails
      }

      const responseData = await response.json();
      setLikeCount(responseData.likecount); // Update like count
      setHasLiked(!hasLiked); // Toggle like status

    } catch (error) {
      showToast('error', error.message); // Handle unexpected errors
    }
  };

  return (
    // Button to display like icon and count
    <button
      onClick={handleLike}
      type='button'
      className='flex justify-between items-center gap-1'
    >
      {/* Show filled thumb if liked, outline if not */}
      {!hasLiked ? <SlLike /> : <IoThumbsUp color='green' />}
      {likeCount}
    </button>
  );
}

export default LikeCount;
