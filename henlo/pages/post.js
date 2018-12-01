import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import React from 'react';
import styled from 'styled-components';

import { Heading } from './index';

const Image = styled.img`
	height: 300px;
	width: 100%;
	object-fit: cover;
	margin: 2rem 0rem;
`

const Meta = styled.p`
	font-size: 2rem;
	color: ${props => props.theme.fg };
`

const Category = styled.span`
	font-size: 1.5rem;
	color: ${props => props.theme.bg };
	background-color: ${props => props.theme.fg};
	padding: 2.5px 5px;
	margin-right: 2.5px;
`

const Content = styled.p`
	font-size: 2rem;
	line-height: 1.4;
`


class post extends React.Component {
	static getInitialProps = async ({ query }) => {
		const res = await fetch(`http://localhost:3333/${query.id}`);
		const data = await res.json();
		return {
			post: data
		}
	}

	render() {
		return (
			<div>
				<Heading style={{ marginBottom: 0 }}>{this.props.post[0][1]}</Heading>
				<Meta>{this.props.post[0][2]}</Meta>
				{this.props.post[0][5] && <Image src={this.props.post[0][5]} alt={this.props.post[0][1]}/>}
				{this.props.post[0][3].split(",").map((cat, i) => <Category key={i}>{cat}</Category>)}
				<Content>{this.props.post[0][4]}</Content>
			</div>
		)
	}
}

export default withRouter(post);
