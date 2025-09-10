import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { FaRegComment } from "react-icons/fa";
import React from 'react';

const CommentCount = ({ props }) => {
  // Fetch the comment count for a specific blog using the blog ID
  const { data, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`,
    { method: 'get', credentials: 'include' }
  );

  return (
    // Button displaying comment icon and count
    <button type='button' className='flex justify-between items-center gap-1'>
      <FaRegComment />
      {data && data.commentCount} {/* Show comment count if data is available */}
    </button>
  );
}

export default CommentCount;
