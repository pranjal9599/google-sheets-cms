import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.div`
	padding: 1rem 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.shadowColor };
`

const Logo = styled.a`
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 3rem;
	color: ${props => props.theme.fg};
	text-decoration: none;
	font-style: italic;
	font-weight: 700;
`

const Toggle = styled.span`
	font-size: 3rem;
	cursor: pointer;
	margin-left: auto;
`;

const Header = props => (
	<HeaderContainer>
		<Link href="/">
			<Logo href="#">
				😵
			</Logo>
		</Link>
		<Toggle onClick={props.theme}>
			{props.currentTheme != 'dark' ? '🌙' : 	'☀️'}
		</Toggle>
	</HeaderContainer>
)

export default Header;
