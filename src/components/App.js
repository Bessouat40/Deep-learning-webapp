import '../styles/section.css'

import Head from './head'
import Previews from './Dropzone'
import Upload from './upload2'
import Paragraphe from './texte'

function App() {
	return (<section>
			<Head />
			<div className = 'container'>
				<Previews className = "one"/>
				<Upload className = "two" />
				<Paragraphe className = 'three' />
				
			</div>		
			</section>
	)
}

export default App