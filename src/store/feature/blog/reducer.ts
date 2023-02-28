import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

import { reqBlogCategoryList, reqBlogDetail, reqBlogList } from "@/service/blog"
import dcCache from "@/utils/localstore"

interface InitialStateType {
	blogList: any[]
	blogTotal: number
	pageSize: number
	blogCategory: any[]
	blogDetail: any
}
const initialState: InitialStateType = {
	blogList: [],
	blogTotal: 0,
	pageSize: 10,
	blogCategory: [],
	blogDetail: {},
}

// 异步action
export const fetchBlogList = createAsyncThunk(
	"blog/fetchBlogList",
	async (payload: any, { dispatch }) => {
		const res = await reqBlogList({ ...payload })
		// console.log(res)
		return res.result
	}
)

// 获取blog分类
export const fetchBlogCategory = createAsyncThunk(
	"blog/fetchBlogCategory",
	async (payload, { dispatch }) => {
		const res: any = await reqBlogCategoryList()
		console.log(res)
		return res.result
	}
)

// 获取博客详情
export const fetchBlogDetail = createAsyncThunk(
	"blog/fetchBlogDetail",
	async (payload: string, { dispatch }) => {
		const res: any = await reqBlogDetail(payload)
		// console.log(res)
		if (res.status === 200) {
			return res.result.data
		}
	}
)

console.log(fetchBlogList)
const blogReducer = createSlice({
	name: "blog",
	initialState: initialState,
	reducers: {
		getBlogList(state: any, action: PayloadAction<any[]>) {
			state.blogList = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBlogList.fulfilled, (state, action: PayloadAction<any>) => {
				// state.blogList = action.payload
				state.blogList = action.payload.data
				state.blogTotal = action.payload.total
			})
			.addCase(fetchBlogCategory.fulfilled, (state, action) => {
				state.blogCategory = action.payload.data
				dcCache.setCache("blogCategory", state.blogCategory)
			})
			.addCase(
				fetchBlogDetail.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.blogDetail = action.payload[0]
				}
			)
	},
})

export const { getBlogList } = blogReducer.actions
export default blogReducer.reducer
