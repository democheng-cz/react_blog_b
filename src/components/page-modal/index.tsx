import React, { memo } from "react"

import { Modal } from "antd"

import { PageModalWrapper } from "./style"
import DcForm from "../dc-form"

const PageModal = memo(() => {
	return (
		<PageModalWrapper>
			<Modal>{/* <DcForm /> */}</Modal>
		</PageModalWrapper>
	)
})
export default PageModal
