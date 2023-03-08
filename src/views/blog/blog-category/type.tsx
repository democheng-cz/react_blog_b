import { Select, Input } from "antd"

export const blogCategoryConfig = {
	type: "upload",
	hasUpload: true,
	statusOptions: [
		{
			label: "已发布",
			value: "1",
		},
		{
			label: "未发布",
			value: 0,
		},
	],
	formItems: [
		{
			name: "title",
			label: "标题",
			width: "30%",
			type: "input",
			element: <Input />,
		},
		{
			name: "status",
			label: "状态",
			width: "30%",
			type: "select",
			element: <Select />,
		},
		{
			name: "category_id",
			label: "分类",
			width: "30%",
			type: "select",
			element: <Select />,
		},
		{
			name: "cover",
			label: "上传封面",
			type: "upload",
			width: "20%",
		},
		{
			name: "content",
			label: "",
			type: "md",
			with: "100%",
		},
	],
}
