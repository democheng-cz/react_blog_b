const path = require("path")
const CracoLessPlugin = require("craco-less")

const CracoAntDesignPlugin = require("craco-antd")

const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")

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
	// style: {
	postcss: {
		plugins: [require("autoprefixer"), require("tailwindcss")],
	},
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
	resolve: {
		extension: [".ts", ".js", ".tsx", ".json"],
	},
}
