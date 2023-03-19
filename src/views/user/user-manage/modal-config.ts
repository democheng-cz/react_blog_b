export const modalConfig = {
	name: "user",
	type: "update",
	hasUpload: true,
	statusOptions: [
		{
			label: "启用",
			value: 1,
		},
		{
			label: "禁用",
			value: 0,
		},
	],
	hasBtns: false,
	formItems: [
		{
			name: "nick_name",
			label: "昵称",
			width: "80%",
			type: "input",
		},
		{
			name: "state",
			label: "状态",
			width: "80%",
			type: "select",
		},
		{
			name: "role_id",
			label: "角色",
			width: "80%",
			type: "select",
		},
		{
			name: "avatar",
			type: "upload",
			label: "头像",
			width: "80%",
		},
	],
}
