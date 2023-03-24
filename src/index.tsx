import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter, BrowserRouter } from "react-router-dom"

import App from "./App"
import store from "./store"

import "normalize.css"
import "@/assets/less/reset.less"
import "@/assets/tailwindcss/tailwindcss.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		{/* <HashRouter> */}
		<HashRouter>
			<App />
		</HashRouter>
		{/* </HashRouter> */}
	</Provider>

	// </React.StrictMode>
)
