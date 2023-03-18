import React, { memo, useState, useEffect } from "react"

import { UserManageWrapper } from "./style"

import PageSearch from "@/components/page-search"
import { searchConfig } from "./config"
import usePageSearch from "@/hooks/usePageSearch"

import PageTable from "@/components/page-table"
import { TableColumns } from "./table"
import usePageTable from "@/hooks/usePageTable"

import PageModal from "@/components/page-modal"
import { modalConfig } from "./modal-config"
import usePageModal from "@/hooks/usePageModal"

import { useAppDispatch, useAppSelector } from "@/store"
import { fetchUserList } from "@/store/feature/user/reducer"
import { reqUpdateUserInfo } from "@/service/user"
import { updateCurrentBlogFormData } from "@/store/feature/blog/reducer"
import { message } from "antd"

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
	const { userList } = useAppSelector(state => {
		return {
			userList: state.user.userList,
		}
	})

	// 搜索按钮的回调
	const submitCallback = (value: any) => {
		dispatch(fetchUserList(value))
	}

	// 修改用户信息的回调
	const handleUpdateCallback = async (value: any) => {
		console.log(value)
		const res = await reqUpdateUserInfo(value, "avatar")
		if (res.status === 201) {
			// console.log(res)
			message.success("修改成功")
			dispatch(fetchUserList({}))
		}
	}
	const { searchFormData, setSearchFormData, handleSubmit } =
		usePageSearch(submitCallback)

	const { modalFormData, setModalFormData, handleUpdate } =
		usePageModal(handleUpdateCallback)

	const { tableKey, setTableKey } = usePageTable()

	useEffect(() => {
		dispatch(fetchUserList({}))
	}, [])

	return (
		<UserManageWrapper>
			{/* 搜索表单 */}
			<PageSearch
				handleSubmit={value => handleSubmit(value)}
				formConfig={searchConfig}
				formData={searchFormData}
				setFormData={setSearchFormData}
			></PageSearch>

			{/* 表格 */}
			<PageTable
				key={tableKey}
				columns={TableColumns({ setShowModal, setModalFormData, setTableKey })}
				data={userList}
				rowKey={record => record.user_id}
				pagination={paginationProps}
				isLoading={true}
			/>

			{/* modal框 */}
			<PageModal
				handleSubmit={value => handleUpdate(value)}
				formConfig={modalConfig}
				formData={modalFormData}
				setFormData={setModalFormData}
				showModal={showModal}
				setShowModal={setShowModal}
				selectData={[]}
			></PageModal>
		</UserManageWrapper>
	)
})

export default UserManage
