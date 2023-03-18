import { useState } from "react"

const usePageTable = () => {
	const [tableKey, setTableKey] = useState(Date.now)

	return {
		tableKey,
		setTableKey,
	}
}

export default usePageTable
