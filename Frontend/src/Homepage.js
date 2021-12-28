import React from 'react'
import "./Homepage.css";
function Homepage() {
	return (
		<div className='full'>
		<center>
		<div className="homepage">

		<h1 className="homepage__title">Select one.....</h1>
		<div className="homepage__cta">
		<a href="/pie"><button className="button button--homepage button--double">BarGraph and PieChart</button></a>
		<a href="/data">	<button className="button button--homepage button--cta button--double">Table Form Filter</button></a>
		<a href="/misc">	<button className="button button--homepage button--double">Misc Graph</button></a>
		</div>
		</div>
		</center>
		</div>

	)
}

export default Homepage
