import React, { memo, useState, useEffect } from "react"

import { Table } from "antd"
import type { PaginationProps } from "antd/es/pagination"
import type { ColumnsType } from "antd/es/table"
import { PageTableWrapper } from "./style"

interface PageTablePropsType {
	columns: any[]
	data: any[]
	rowKey?: string | ((record: any) => string)
	pagination: PaginationProps
	isLoading: boolean
}

const PageTable: React.FC<PageTablePropsType> = memo(props => {
	const { columns, data, rowKey, pagination } = props
	let [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		let timer = setTimeout(() => {
			if (!data.length) {
				setIsLoading(false)
			}
		}, 5000)
		return () => {
			clearTimeout(timer)
		}
	}, [])
	return (
		<PageTableWrapper>
			<Table
				columns={columns}
				dataSource={data}
				rowKey={rowKey}
				pagination={pagination}
				loading={isLoading}
			/>
		</PageTableWrapper>
	)
})
export default PageTable
