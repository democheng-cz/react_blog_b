import React, { memo, useState, useEffect } from "react"

import { UserManageWrapper } from "./style"

import PageSearch from "@/components/page-search"
import { searchConfig } from "./config"
import usePageSearch from "@/hooks/usePageSearch"

import PageTable from "@/components/page-table"
import { tableConfig } from "./table-config"
import usePageTable from "@/hooks/usePageTable"

import PageModal from "@/components/page-modal"
import { modalConfig } from "./modal-config"
import usePageModal from "@/hooks/usePageModal"

import { useAppDispatch, useAppSelector } from "@/store"
import { fetchUserList } from "@/store/feature/user/reducer"

import { getRoleList } from "@/store/feature/login/actions"

import { reqUpdateUserInfo } from "@/service/user"

const paginationProps = {
	pageSize: 10,
	pageSizeOptions: [5, 10, 15],
	responsive: true, //当size未指定时, 根据屏幕自适应
	showQuickJumper: true, // 开启快速跳转页码
	// size: "small",
	onchange: (page: number, pageSize: number) => {},
	onShowSizeChange: (current: number, size: number) => {},
}

const UserManage = memo(() => {
	const [showModal, setShowModal] = useState(false)
	const dispatch = useAppDispatch()
	const { userList, roleList } = useAppSelector(state => {
		return {
			userList: state.user.userList,
			roleList: state.login.roleList,
		}
	})

	// 搜索按钮的回调
	// const submitCallback = (value: any) => {
	// 	dispatch(fetchUserList(value))
	// }

	// 修改用户信息的回调
	// const handleUpdateCallback = async (value: any) => {
	// 	console.log(value)
	// 	const res = await reqUpdateUserInfo(value, "avatar")
	// 	if (res.status === 201) {
	// 		// console.log(res)
	// 		message.success("修改成功")
	// 		dispatch(fetchUserList({}))
	// 	}
	// }

	const { handleSearch, handleReset, PageTableRef } = usePageSearch()

	const { handleUpdate } = usePageModal()

	const { tableKey, setTableKey } = usePageTable()

	const data = [
		{
			key: "1",
			firstName: "John",
			lastName: "Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			tags: ["nice", "developer"],
		},
		{
			key: "2",
			firstName: "Jim",
			lastName: "Green",
			age: 42,
			address: "London No. 1 Lake Park",
			tags: ["loser"],
		},
		{
			key: "3",
			firstName: "Joe",
			lastName: "Black",
			age: 32,
			address: "Sydney No. 1 Lake Park",
			tags: ["cool", "teacher"],
		},
	]
	useEffect(() => {
		dispatch(fetchUserList({}))
		dispatch(getRoleList())
	}, [])

	return (
		<UserManageWrapper>
			{/* 搜索表单 */}
			<PageSearch
				formConfig={searchConfig}
				searchChange={(formData: any) => handleSearch(formData)}
				resetChange={() => {
					handleReset()
				}}
			/>

			{/* 表格 */}
			<PageTable
				key={tableKey}
				data={userList}
				rowKey={(record: any) => record.user_id}
				pagination={paginationProps}
				ref={PageTableRef}
				pageName="user"
				tableConfig={tableConfig}
			/>

			{/* modal框 */}
			<PageModal
				formConfig={modalConfig}
				selectData={roleList.map((item: any) => {
					return { label: item.role, value: item.role_id }
				})}
			></PageModal>
		</UserManageWrapper>
	)
})

export default UserManage
