const path = require("path")
const CracoLessPlugin = require("craco-less")

const CracoAntDesignPlugin = require("craco-antd")

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyvars: { "@primary": "#1DA57A" },
						javascriptEnabled: true,
					},
				},
			},
		},
		{
			plugin: CracoAntDesignPlugin,
		},
	],

	// babel: {
	// 	plugins: [
	// 		[
	// 			"import",
	// 			{
	// 				libraryName: "antd",
	// 				libraryDirectory: "es",
	// 				style: "true", //设置为true即是less 这里用的是css
	// 			},
	// 		],
	// 	],
	// },

	// 扩展webpack配置
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		extension: [".jsx", ".tsx", ".json"],
	},

	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:8888",
				changeOrigin: true,
				pathRewrite: {
					"/api": "",
				},
			},
		},
	},
}
