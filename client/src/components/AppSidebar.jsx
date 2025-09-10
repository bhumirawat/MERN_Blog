import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';

// Icons
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { GoDot } from "react-icons/go";

// Routes
import { 
  RouteBlog, 
  RouteBlogByCategory, 
  RouteBlogDetails, 
  RouteCategoryDetails, 
  RouteCommentDetails, 
  RouteIndex, 
  RouteUser 
} from "@/helpers/RouteName";

// Hooks
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  // Get logged-in user from Redux store
  const user = useSelector(state => state.user);

  // Fetch all categories from API
  const { data: categoryData } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/category/all-category`,
    {
      method: 'get',
      credentials: 'include',
    }
  );

  return (
    <Sidebar className="top-0 left-0 pt-3">
      
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="bg-white">
        <img src={logo} width={120} alt="Logo" />
      </SidebarHeader>

      <SidebarContent className="bg-white">
        
        {/* Main Navigation Menu */}
        <SidebarGroup>
          <SidebarMenu>

            {/* Home Link */}
            <SidebarMenuItem>
              <Link to={RouteIndex}>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <div>Home</div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            {/* Show these links if user is logged in */}
            {user && user.isLoggedIn && (
              <>
                {/* Blog Link */}
                <SidebarMenuItem>
                  <Link to={RouteBlog}>
                    <SidebarMenuButton>
                      <GrBlog />
                      <div>Blog</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                {/* Comments Link */}
                <SidebarMenuItem>
                  <Link to={RouteCommentDetails}>
                    <SidebarMenuButton>
                      <FaRegComments />
                      <div>Comments</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
            )}

            {/* Admin-only Links */}
            {user && user.isLoggedIn && user.user.role === 'admin' && (
              <>
                {/* Categories Link */}
                <SidebarMenuItem>
                  <Link to={RouteCategoryDetails}>
                    <SidebarMenuButton>
                      <BiCategoryAlt />
                      <div>Categories</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                {/* User Management Link */}
                <SidebarMenuItem>
                  <Link to={RouteUser}>
                    <SidebarMenuButton>
                      <TbUsers />
                      <div>User</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
            )}

          </SidebarMenu>
        </SidebarGroup>

        {/* Categories Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {/* Render categories dynamically */}
            {categoryData?.category?.length > 0 &&
              categoryData.category.map(category => (
                <SidebarMenuItem key={category._id}>
                  <Link to={RouteBlogByCategory(category.slug)}>
                    <SidebarMenuButton>
                      <GoDot />
                      <div>{category.name}</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
