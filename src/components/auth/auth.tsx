import dcCache from "@/utils/localstore"
import { Navigate } from "react-router-dom"

function Auth({ children }: any) {
	// const navigate = useNavigate()
	const userInfo = dcCache.getCache("userInfo")
	console.log("first")
	console.log(children)
	if (userInfo) {
		return children
	} else {
		return <Navigate to="login" />
	}
}

export default Auth
