import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { lazy } from "react"

const Login = lazy(() => import("@/views/login"))
const Layout = lazy(() => import("@/views/Layout"))
const BlogManage = lazy(() => import("@/views/blog/blog-manage"))
const BlogCategory = lazy(() => import("@/views/blog/blog-category"))
const UserManage = lazy(() => import("@/views/user/user-manage"))
const UserRole = lazy(() => import("@/views/user/user-role"))
const TopicManage = lazy(() => import("@/views/topic/topic-manage"))
const SettingProfile = lazy(() => import("@/views/setting/setting-profile"))
const SettingUser = lazy(() => import("@/views/setting/setting-user"))
const SettingSystem = lazy(() => import("@/views/setting/setting-system"))

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/blog/manage" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "blog/manage",
				element: <BlogManage />,
			},
			{
				path: "blog/category",
				element: <BlogCategory />,
			},
			{
				path: "user/manage",
				element: <UserManage />,
			},
			{
				path: "user/role",
				element: <UserRole />,
			},
			{
				path: "topic/manage",
				element: <TopicManage />,
			},
			{
				path: "setting/profile",
				element: <SettingProfile />,
			},
			{
				path: "setting/user",
				element: <SettingUser />,
			},
			{
				path: "/setting/system",
				element: <SettingSystem />,
			},
		],
	},
]
export default routes
