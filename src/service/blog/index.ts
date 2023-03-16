import { Interface } from "readline"
import request from "../request"

interface ResType {
	status: number
	message: string
	result: any
}
// 获取所有的博客(根据不同条件查询)
interface InitQueryType {
	title?: string
	category_id?: string
	status?: number
	pageSize?: number
	pageNum?: number
}
export const reqBlogList = (query: InitQueryType) => {
	// console.log("first")
	return request.get<ResType>({
		url: "/blog",
		params: { ...query },
	})
}

// 获取所有的分类
export const reqBlogCategoryList = () => {
	return request.get({
		url: "/blog/category",
	})
}

// 上传blog
export const reqUploadBlog = (blogInfo: any) => {
	// console.log(blogInfo)
	return request.post({
		url: "/blog",
		data: blogInfo,
	})
}

// 通过blog_id获取博客详情
export const reqBlogDetail = (blog_id: string) => {
	return request.get({ url: `/blog/${blog_id}` })
}

// 根据blog_id删除博客
export const reqDeleteBlog = (blog_id: string) => {
	return request.delete({ url: `/blog/${blog_id}` })
}
