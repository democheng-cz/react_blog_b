import { useState } from "react"

function usePageSearch(submitCallback: (val: any) => void) {
	const [formData, setFormData] = useState({
		name: "",
		status: "",
	})

	// 用于处理提交
	const handleSubmit = (val: any) => {
		submitCallback(val)
	}

	return {
		handleSubmit,
		searchFormData: formData,
		setSearchFormData: setFormData,
	}
}

export default usePageSearch
