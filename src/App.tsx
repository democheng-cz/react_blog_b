import React, { Suspense } from "react"
import routes from "./router"
import { useRoutes } from "react-router-dom"
import dcCache from "@/utils/localstore"

function App() {
	return (
		<div className="App" style={{ width: "100%", height: "100%" }}>
			<Suspense fallback="加载中....">{useRoutes(routes)}</Suspense>
		</div>
	)
}

export default App
