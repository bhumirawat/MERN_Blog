import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Loading from "@/components/Loading";
import { RouteAddBlog, RouteBlogEdit } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const user = useSelector((state) => state.user);

  // Choose API endpoint based on user role (admin → all blogs, user → own blogs)
  const endpoint = user.isLoggedIn
    ? user.user.role === "admin"
      ? "/blog/get-all"
      : "/blog/my-blogs"
    : "/blog/get-all";

  //  Fetch blog data from API
  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}${endpoint}`,
    { method: "get", credentials: "include" },
    [refreshData, user.isLoggedIn, user.user?.role] // Refetch when auth state or role changes
  );

  //  Handle delete blog
  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          {/* Add Blog Button */}
          <div>
            <Button asChild>
              <Link to={RouteAddBlog}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Blog Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      {/* Edit Button */}
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      {/* Delete Button */}
                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6">Data not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
