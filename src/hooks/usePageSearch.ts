import { ElementRef, useRef, useState } from "react"

import PageTable from "@/components/page-table"

function usePageSearch() {
	const PageTableRef: any = useRef<ElementRef<typeof PageTable>>()

	const handleSearch = (formData: any) => {
		PageTableRef.current!.getDataList(formData)
	}

	const handleReset = () => {
		// console.log("reset")
		PageTableRef.current!.getDataList({})
	}

	return {
		PageTableRef,
		handleSearch,
		handleReset,
	}
}

export default usePageSearch
