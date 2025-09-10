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
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '../assets/images/logo.png'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteBlogDetails, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector(state => state.user)
  const {data: categoryData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
          method:'get',
          credentials: 'include'
    })


  return (
    <Sidebar className="top-0 left-0 pt-3">
      <SidebarHeader className="bg-white">
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
            <SidebarMenu>

                <SidebarMenuItem>
                  <Link to={RouteIndex}>
                    <SidebarMenuButton>
                        <IoHomeOutline />
                        <div>Home</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

              {user && user.isLoggedIn
              ?
              <>
                <SidebarMenuItem>
                    <Link to={RouteBlog}>
                    <SidebarMenuButton>
                        <GrBlog />
                        <div>Blog</div>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link to={RouteCommentDetails}>
                    <SidebarMenuButton>
                        <FaRegComments />
                        <div>Comments</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                </>
              :
                <></>
              }

              {user && user.isLoggedIn && user.user.role === 'admin' 
              ?
              <>
                <SidebarMenuItem>
                    <Link to={RouteCategoryDetails}>
                    <SidebarMenuButton>
                      <BiCategoryAlt />
                        <div>Categories</div>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link to={RouteUser}>
                    <SidebarMenuButton>
                        <TbUsers />
                        <div>User</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </>
              :
              <></>
              }
                
                
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
            <SidebarMenu>
              {categoryData && categoryData.category.length > 0
                && categoryData.category.map(category => 
                <SidebarMenuItem key={category._id}>
                  <Link to={RouteBlogByCategory(category.slug)}>
                    <SidebarMenuButton>
                        <GoDot />
                        <div>{category.name}</div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>)
              }
                
            </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar