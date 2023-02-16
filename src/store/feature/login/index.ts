interface ActionType {
	type: string
	payload: any
}
interface UserinfoType {
	userId?: number
	nickName?: string
	avatar?: string
	phone?: string
	profession?: string
	introduction?: string
	editorType?: number
	roleType?: number
	editorTypeName?: string
}

interface InitStateType {
	userInfo: UserinfoType
}
const initState: InitStateType = {
	userInfo: {
		nickName: "我是初识值",
	},
}

const loginReducer = function (state = initState, action: ActionType) {
	const { type, payload } = action
	switch (type) {
		case "login":
			return {
				...state,
				userInfo: {
					...state.userInfo,
					nickName: payload,
				},
			}
		case "logout":
			return {
				...state,
				userInfo: {
					...state.userInfo,
					nickName: payload,
				},
			}
		default:
			return {
				...state,
			}
	}
}

export default loginReducer
