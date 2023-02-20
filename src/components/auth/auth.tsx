import dcCache from "@/utils/localstore"
import { Navigate } from "react-router-dom"

function Auth({ children }: any) {
	const token = dcCache.getCache("token")
	if (token) {
		return children
	} else {
		return <Navigate to="login" />
	}
}

export default Auth
