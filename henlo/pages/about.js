const about = props => (
	<div>
		<span>{props.working}</span>
	</div>
);

about.getInitialProps = async function() {
	return {
		working: 1
	}
}

export default about;
