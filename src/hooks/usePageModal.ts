import { useState } from "react"

function usePageModal(updateCallback: (val: any) => void) {
	const [modalFormData, setModalFormData] = useState({
		nick_name: "",
		state: "",
		role: "",
		avatar: "",
	})

	const handleUpdate = (val: any) => {
		updateCallback(val)
	}

	return {
		modalFormData,
		setModalFormData,
		handleUpdate,
	}
}

export default usePageModal
