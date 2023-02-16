import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { lazy } from "react"

const Login = lazy(() => import("@/views/login"))

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]
export default routes
