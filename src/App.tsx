import React, { Suspense } from "react"
import routes from "./router"
import { useRoutes } from "react-router-dom"
import DcLoading from "./components/dc-loading"

function App() {
	return (
		<div className="App" style={{ width: "100%", height: "100%" }}>
			<Suspense fallback={<DcLoading />}>{useRoutes(routes)}</Suspense>
		</div>
	)
}

export default App
