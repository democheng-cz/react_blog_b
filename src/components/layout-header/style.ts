import styled from "styled-components"

export const LayoutHeaderWrapper = styled.div`
	.header {
		height: 64px;
		display: flex;
		/* flex-direction: column; */
		justify-content: flex-end;
		align-items: center;
		.userInfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			span {
				font-size: 12px;
			}
		}
	}
	.ant-layout-header {
		line-height: normal !important;
	}
`
