import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '@/helpers/firebase';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { RouteIndex } from '@/helpers/RouteName';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Google login
  const handleLogin = async () => {
    try {
      // Sign in with Google popup
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;

      // Prepare user data to send to backend
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      // Send user data to backend for authentication/registration
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message); // Show error toast if login fails
      }

      // Update Redux store with user data
      dispatch(setUser(data.user));

      // Redirect to home page
      navigate(RouteIndex);

      // Show success message
      showToast('success', data.message);

    } catch (error) {
      // Handle unexpected errors
      showToast('error', error.message);
    }
  };

  return (
    // Google login button
    <Button
      variant="outline"
      className='w-full mb-3 flex justify-center items-center gap-2'
      onClick={handleLogin}
    >
      <FcGoogle />
      Continue With Google
    </Button>
  );
}

export default GoogleLogin;
