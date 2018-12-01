import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';


import Card from '../components/Card';


const Container = styled.div`
	max-width: 940px;
	margin: 0 auto;
`;

export const Heading = styled.h1`
	font-weight: 600;
	font-size: 8rem;
	span {
		font-weight: 300;
	}
`

class index extends React.Component {

	static async getInitialProps({req}) {
		const res = await fetch('http://localhost:3333/');
		let data = await res.json();
		data.splice(0,1);
		data = data.reverse();
		return {
			posts: data,
		}
	}


	render() {
		return (
			<React.Fragment>
				<Heading>Diary of a <span>Wimpy Kid</span></Heading>
				{this.props.posts.map((post, i) => (
					<Link 
						key={i}
						href={`/post?id=${post[0]}`}
					><a>
						<Card 
							title={post[1]} 
							meta={post[2]} 
							categories={post[3]} 
							description={post[4]}
							image={post[5]}
						/></a>
					</Link>
				))}
			</React.Fragment>
		)
	}

}


export default index;
