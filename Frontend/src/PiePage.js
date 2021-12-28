import Axios from 'axios';
import Piechart from './Components/Piechart';
import React, { useState, useEffect } from 'react';
import BarGraph from './Components/BarGraph';

function PiePage() {
	const items = [
		{ label: "intensity",value: "intensity"},
		{ label: "likelihood", value: "likelihood" },
		{ label: "relevance", value: "relevance" },
		{ label: "impact", value: "impact" },
		{ label: "start_year",value:"start_year"},
		{ label:"end_year",value:"end_year"},
		{ label:"country",value:"country"},
		{ label:"topic",value:"topic"},
		{ label:"region",value:"region"},
		{ label:"sector",value:"sector"}
	  ];
	const [Data, setData] = useState([]);
	const [variable, setVariable] = useState(["intensity"]);
	const fetchData = async () => {
	  const { data } = await Axios.get(`http://localhost:8080/count/${variable}`);
	  setData(data);
	};
	useEffect(() => {
	  fetchData();
	}, [variable]);// eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div >
		<center><h3>Currently Showing the distribution of: {variable}</h3></center>
		<br/>
		<center>Select the filter: {
			"    "}
		<select
      value={variable}
      onChange={(e) => setVariable(e.currentTarget.value)}
    		>
			{items.map(item => (
				<option
				key={item.value}
				value={item.value}
				>
				{item.label}
				</option>
			))}
		</select>
		</center>
		<div >

			<center><h4>*BLANK DENOTES DATA MISSING OR EMPTY*</h4><h3>Bar Graph</h3><p>Y axis: Number of documents<br/> X axis: {variable} </p><BarGraph  data={Data}/></center>
			<br/><br/><center><h3>PieChart</h3><Piechart varia={variable}  data={Data} outerRadius={150} innerRadius={50}/></center>
			
		</div>
		<a href="/"><button className="button button--homepage button">Go Back</button></a>
		</div>
	)
}

export default PiePage;

