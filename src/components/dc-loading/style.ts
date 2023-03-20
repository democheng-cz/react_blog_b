import styled from "styled-components"

export const DcLoadingWrapper = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	.loader {
		display: block;
		position: relative;
		height: 20px;
		width: 86px;
	}
	.loading-square {
		position: absolute;
		height: 20px;
		width: 20px;
		top: 0;
	}
	.loading-square:nth-child(1) {
		left: 0;
		animation: square1 1.5s linear forwards infinite;
	}
	.loading-square:nth-child(2) {
		left: 22px;
		animation: square2 1.5s linear forwards infinite;
	}
	.loading-square:nth-child(3) {
		left: 44px;
		animation: square3 1.5s linear forwards infinite;
	}
	.loading-square:nth-child(4) {
		left: 66px;
		animation: square4 1.5s linear forwards infinite;
	}
	@keyframes square1 {
		0% {
			background-color: #97c900;
			transform: translate(0, 0);
		}
		9.09091% {
			transform: translate(0, calc(-100% - 2px));
			background-color: #97c900;
		}
		18.18182% {
			transform: translate(calc(100% + 2px), calc(-100% - 2px));
			background-color: #15668a;
		}
		27.27273% {
			transform: translate(calc(100% + 2px), 0);
		}
		100% {
			background-color: #15668a;
			transform: translate(calc(100% + 2px), 0);
		}
	}
	@keyframes square2 {
		0% {
			background-color: #15668a;
			transform: translate(0, 0);
		}
		18.18182% {
			transform: translate(0, 0);
		}
		27.27273% {
			transform: translate(0, calc(100% + 2px));
			background-color: #15668a;
		}
		36.36364% {
			transform: translate(calc(100% + 2px), calc(100% + 2px));
			background-color: #d53a33;
		}
		45.45455% {
			transform: translate(calc(100% + 2px), 0);
		}
		100% {
			background-color: #d53a33;
			transform: translate(calc(100% + 2px), 0);
		}
	}
	@keyframes square3 {
		0% {
			background-color: #d53a33;
			transform: translate(0, 0);
		}
		36.36364% {
			transform: translate(0, 0);
		}
		45.45455% {
			transform: translate(0, calc(-100% - 2px));
			background-color: #d53a33;
		}
		54.54545% {
			transform: translate(calc(100% + 2px), calc(-100% - 2px));
			background-color: #e79c10;
		}
		63.63636% {
			transform: translate(calc(100% + 2px), 0);
		}
		100% {
			background-color: #e79c10;
			transform: translate(calc(100% + 2px), 0);
		}
	}
	@keyframes square4 {
		0% {
			transform: translate(0, 0);
			background-color: #e79c10;
		}
		54.54545% {
			transform: translate(0, 0);
		}
		63.63636% {
			transform: translate(0, calc(100% + 2px));
			background-color: #e79c10;
		}
		72.72727% {
			background-color: #d53a33;
		}
		81.81818% {
			background-color: #15668a;
		}
		90.90909% {
			transform: translate(calc(-300% - 6px), calc(100% + 2px));
			background-color: #97c900;
		}
		100% {
			transform: translate(calc(-300% - 6px), 0);
			background-color: #97c900;
		}
	}
`
