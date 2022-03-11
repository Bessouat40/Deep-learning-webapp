import '../styles/head.css'

const img = {
	display: 'block',
	width: 'auto',
	position : 'center',
	height: '100%'
  };

function Head() {
	const title = "Application de classification d'images"
	return (
		<div className = "lmj-title">
			<img src ="uqac.png"/>
			<h1>{title}</h1>
		</div>
	)
}

export default Head;