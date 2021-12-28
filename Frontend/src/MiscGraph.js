import React from 'react'
import CircularBar from './Components/CircularBar'
import Wordgraph from './Components/Wordgraph'
function MiscGraph() {
	return (
		<div>
			<center><h1><strong>Some Miscellaneous Graphs</strong></h1></center>
			<CircularBar uniq={"circular-barplot1"} variable={"country"}/>
			<CircularBar uniq={"circular-barplot2"} variable={"region"}/>
			<CircularBar uniq={"circular-barplot3"} variable={"topic"}/>
			<CircularBar uniq={"circular-barplot4"} variable={"sector"}/>
			<Wordgraph variable={"topic"}/>
			<Wordgraph variable={"source"}/>
			<a href="/"><button className="button button--homepage button">Go Back</button></a>
		</div>
	)
}

export default MiscGraph
