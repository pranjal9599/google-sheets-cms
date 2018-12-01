import React, { Component } from 'react';
import Header from './Header';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

let theme = {
	bg: '#000',
	fg: '#fff',
	shadowColor: 'rgba(255,255,255,0.2)',
}

let themeAlt = {
	bg: '#fff',
	fg: '#000',
	shadowColor: 'rgba(0,0,0,0.2)',
}


const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,400i,500,500i,600,700');

	body {
		font-family: 'IBM Plex Sans', sans-serif;
		margin: 0; padding: 0;
		background: ${props => props.theme.bg };
		color: ${props => props.theme.fg };
	}
	html { font-size: 10px; }
	* { box-sizing: border-box; }
	a { color: ${props => props.theme.fg }; text-decoration: none; }

`;

const Container = styled.div`
	max-width: 760px;
	margin: 0 auto;
`;

class Page extends Component {
	state = {
		theme:"light"
	}

	toggleTheme = () => {
		if (this.state.theme == "light") {
			this.setState({theme: "dark"})
		}
		if (this.state.theme == "dark") {
			this.setState({theme: "light"})
		}
	}

	render() {
		return (
			<ThemeProvider theme={this.state.theme == 'dark' ?
				theme : themeAlt}>
				<React.Fragment>
					<Header currentTheme={this.state.theme} theme={this.toggleTheme}/>
					<GlobalStyle />
					<Container>
						{this.props.children}	
					</Container>
				</React.Fragment>
			</ThemeProvider>
		)
	}
}

export default Page;
