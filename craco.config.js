const path = require("path")
const { CracoLessPlugin } = require("craco-less")

module.exports = {
	plugins: [
		{
			plugin: new CracoLessPlugin(),
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyvars: { "@primary": "#1DA57A" },
						javascriptEnabled: true,
					},
				},
			},
		},
	],

	// 扩展webpack配置
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
}
