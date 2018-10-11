import styled from 'styled-components';

const Container=styled.div`
	width: ${props=>props.width||100}%;
	margin: auto;
	height: ${props=>props.height||100}%;
	background-color: ${props=>props.background||'#ccc'};
	overflow: hidden
`;

const IconDiv=styled.div`
	float: ${props=>props.float};
	color: white;
	height: 50px;
	width: 50px;
	line-height: 50px;
	font-size: 20px;
`;

const TitleDiv=styled.div`
	line-height: 50px;
	color: white;
	float: left;
	font-size: ${props=>props.size||18}px;
	margin-left: ${props=>props.margin||10}px;
`;

const LayoutDiv=styled.div`
	display: inline-block
	width: ${props=>props.width}%;
	background-color: #44a
`;


export { Container, IconDiv, TitleDiv, LayoutDiv}