import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteAddBlog, RouteIndex, RouteSignIn } from '../helpers/RouteName'
import { useDispatch, useSelector } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/usericon.png'
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { useNavigate } from 'react-router-dom';
import { RouteProfile } from '../helpers/RouteName';
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';


const Navbar = () => {
    const { toggleSidebar } = useSidebar()
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);

    const handleLogout = async () => {
        try {
                  const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`,{
                  method: 'get',
                  credentials: 'include',
                  })
            
                  const data = await response.json()
                  if(!response.ok) {
                    return showToast('error', data.message)
                  }
                  dispatch(removeUser())
                  navigate(RouteIndex)
                  showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const toggleSearch = () =>{
        setShowSearch(!showSearch)
    }

  return (
    <div className='flex justify-between items-center h-16 z-20 fixed w-full bg-white px-4 border-b top-0'>
        <div className='flex justify-center items-center gap-2'>
            <button onClick={toggleSidebar}
            className='md:hidden block 'type='button'>
                <AiOutlineMenu/>
            </button>
            <Link to={RouteIndex}>
            <img src={logo} 
            className='md:w-auto md:h-10 sm:h-8 w-49'/>
            </Link>
        </div>

        <div className='w-[500px]'>
            <div className={`md:relative md:block absolute bg-white 
            left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                <SearchBox />
            </div>
        </div>

        <div className='flex items-center gap-5'>
            <button onClick={toggleSearch} type='button' className='md:hidden block'>
                <IoMdSearch size={25}/>
            </button>
            {!user.isLoggedIn ?
            <Button asChild className='rounded-full'>
                <Link to={RouteSignIn}>
                    <MdLogin />
                    Sign-in
                </Link>

            </Button>
            :
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user.user.avatar||usericon} />
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <p>{user.user.name}</p>
                    <p className='text-sm'>{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link to={RouteProfile}>
                        <FaRegUser />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link to={RouteAddBlog}>
                        <FaPlus />
                        Create Blog
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                        <IoLogOutOutline color='red'/>
                        Logout
                </DropdownMenuItem>
                
            </DropdownMenuContent>
            </DropdownMenu>
        }
            
        </div>
    </div>
  )
}

export default Navbar