import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter, BrowserRouter } from "react-router-dom"

import App from "./App"
import store from "./store"
import "normalize.css"
import "@/assets/less/reset.less"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		{/* <HashRouter> */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
		{/* </HashRouter> */}
	</Provider>

	// </React.StrictMode>
)
