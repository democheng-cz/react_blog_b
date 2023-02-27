import React, { memo } from "react"

import { Table, Tag, Space } from "antd"
import type { PaginationProps } from "antd/es/pagination"
import type { ColumnsType } from "antd/es/table"
import { PageTableWrapper } from "./style"

interface PageTablePropsType {
	columns: any[]
	data: any[]
	rowKey?: string | ((record: any) => string)
	pagination: PaginationProps
}

const PageTable: React.FC<PageTablePropsType> = memo(props => {
	const { columns, data, rowKey, pagination } = props
	return (
		<PageTableWrapper>
			<Table
				columns={columns}
				dataSource={data}
				rowKey={rowKey}
				pagination={pagination}
				// scroll={{ y: 600 }}
				// style={{ width: "100%" }}
			/>
		</PageTableWrapper>
	)
})
export default PageTable
