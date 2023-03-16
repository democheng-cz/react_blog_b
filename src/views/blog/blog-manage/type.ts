export const blogManageConfig = {
	type: "search",
	hasUpload: false,
	statusOptions: [
		{
			label: "已发布",
			value: 1,
		},
		{
			label: "未发布",
			value: 0,
		},
	],
	// categoryOptions: [],
	formItems: [
		{
			name: "title",
			label: "标题",
			width: "30%",
			type: "input",
		},
		{
			name: "status",
			label: "状态",
			width: "30%",
			type: "select",
		},
		{
			name: "category_id",
			label: "分类",
			width: "30%",
			type: "select",
		},
	],
}
