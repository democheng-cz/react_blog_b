import React, { memo, useState, useImperativeHandle, useEffect } from "react"

import { Modal } from "antd"

import { PageModalWrapper } from "./style"

import { reqUpdateUserInfo, reqUserList } from "@/service/user/index"

import DcForm from "../dc-form"
import { useAppDispatch } from "@/store"
import { fetchUserList } from "@/store/feature/user/reducer"

interface PageModalPropsType {
	formConfig: any
	selectData: any[]
	defaultInfo?: any
}

const PageModal = (props: PageModalPropsType, ref: any) => {
	const dispatch = useAppDispatch()

	const { formConfig, selectData, defaultInfo } = props
	const originData: any = {}

	const [showModal, setShowModal] = useState(false)
	const [formData, setFormData] = useState<any>({})

	const handleOk = async () => {
		await reqUpdateUserInfo({ ...formData, _id: defaultInfo._id })
		dispatch(fetchUserList({}))
		setShowModal(false)
	}

	const handleCancel = () => {
		setShowModal(false)
	}

	// 将需要给父组件调用的方法和属性暴露给父组件
	useImperativeHandle(
		ref,
		() => {
			return {
				setShowModal,
				setFormData,
			}
		},
		[]
	)

	useEffect(() => {
		if (defaultInfo) {
			formConfig.formItems.forEach((item: any) => {
				originData[item.name] = defaultInfo[item.name]
			})
		}
		setFormData({ ...originData })
	}, [defaultInfo])
	return (
		<PageModalWrapper>
			<Modal
				open={showModal}
				onOk={handleOk}
				onCancel={handleCancel}
				centered={true}
				okText="确定"
				cancelText="取消"
			>
				<DcForm
					formConfig={formConfig}
					selectData={selectData}
					formData={formData}
					setFormData={setFormData}
				/>
			</Modal>
		</PageModalWrapper>
	)
}
export default memo(React.forwardRef(PageModal))
