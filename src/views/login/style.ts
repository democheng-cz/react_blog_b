import styled from "styled-components"

export const LoginWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(${require("@/assets/images/login-bj.jpg")});
	background-position: center center;
	block-size: cover;
	/* .form-wrapper {
		background-color: rgba(255, 255, 255, 0.5);
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		.ant-form-item {
			width: 100%;
			margin-bottom: 15px;
		}
		.btn {
			display: flex;
			justify-content: center;
			margin: 0;
		}
		.btns {
			width: 100%;
			display: flex;
			justify-content: space-around;
			button {
				margin: 0 10px;
			}
		}
		.check-code {
			display: flex;
			justify-content: space-around;
			input {
				width: 65%;
			}
			img {
				width: 30%;
				height: 30px;
			}
		}
	} */
`
