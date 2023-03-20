import dcCache from "@/utils/localstore"
import { Navigate, useNavigate } from "react-router-dom"

function Auth({ children }: any) {
	const token = dcCache.getCache("token")
	const navigate = useNavigate()
	if (token) {
		return children
	} else {
		return <Navigate to="/login" />
	}
}

export default Auth
