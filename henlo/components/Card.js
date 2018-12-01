import styled from 'styled-components';

const CardContainer = styled.div`
	padding: 1.5rem 2rem;
	border: 1px solid ${props => props.theme.shadowColor};
	margin: 2rem 0rem;
	h2 {
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	span {
		font-size: 1.5rem;
		font-weight: 600;
		display: block;
	}
	> p {
		font-size: 1.5rem;
		margin: 0;
	}
	> div {
		display: flex;
		flex-direction: row;
		margin: 0.5rem 0rem;
	}
	&:hover {
		border-color: ${props => props.theme.fg};
	}
	.text {
		font-size:1.5rem;
	}
	img {
		width: 100%;
		height: 250px;
		object-fit: cover;
	}
`;

const Category = styled.div`
	background-color: ${props => props.theme.fg};
	color: ${props => props.theme.bg};
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	transform: skew(-10deg);
	margin-right: 5px;
`;

const Card = props => 
	<CardContainer>
		{props.image && <img src={props.image} />}
		<h2>{props.title}</h2>		
		
		<div>
		{props.categories.split(',').map((category,i) => <Category key={i}>{category}</Category>)}
		</div>
		
		<span>{props.meta}</span>		
		<p className="text">{props.description}</p>
	</CardContainer>

export default Card;
