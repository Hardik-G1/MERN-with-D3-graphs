import React,{useState, useEffect} from 'react'
import Axios from "axios";
import "./PiePage.css";
function Table() {
	const items = [
		{ label: "intensity",value: "intensity"},
		{ label: "likelihood", value: "likelihood" },
		{ label: "relevance", value: "relevance" },
		{ label: "impact", value: "impact" },
		{ label: "source", value: "source" },
		{ label:"end_year",value:"end_year"},
		{ label:"country",value:"country"},
		{ label:"topic",value:"topic"},
		{ label:"region",value:"region"},
		{ label:"pestle",value:"pestle"},
		{ label:"sector",value:"sector"}
	  ];
	const [Data, setData] = useState([]);
	const [variable, setVariable] = useState(["title"]);
	const [sortin, setSortin] = useState([1]);
	const [limit, setLimit] = useState([100]);
	const fetchData = async () => {
	  const { data } = await Axios.get('http://localhost:8080/filter/'+variable+'?sort='+sortin+'&limit='+limit);
	  console.log(data);
	  setData(data);
	};
	useEffect(() => {
	  fetchData();
	}, [variable,sortin,limit]);// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="table">
			<center><strong>All Data with the Filters</strong></center>
			<center>Select the filter: {"    "}
			<select value={variable} onChange={(e) => setVariable(e.currentTarget.value)}>
			{items.map(item => (
				<option key={item.value} value={item.value}>
				{item.label}
				</option>
			))}
		</select>
		{" "}Select the order: {" "}
		<select value={sortin} onChange={(e) => setSortin(e.currentTarget.value)}>
				<option key="asc" value={1}>
				Ascending
				</option>
				<option key="desc" value={-1}>
				Descending
				</option>
		</select>
		{" "}Number of Documents: {" "}
		<select value={limit} onChange={(e) => setLimit(e.currentTarget.value)}>
				<option key="10" value={10}>
				10
				</option>
				<option key="50" value={50}>
				50
				</option>
				<option key="100" value={100}>
				100
				</option>
				<option key="1000" value={1000}>
				1000
				</option>
		</select>
		</center>
		<a href="/"><button className="button button--homepage button">Go Back</button></a>
		<div>
		<table>
		<tbody>
			<tr>
				<th>Title</th>
				<th>Source</th>
				<th>Topic</th>
				<th>Sector</th>
				<th>Region</th>
				<th>Country</th>
				<th>Pestle</th>
				<th>End Year</th>
				<th>Impact</th>
				<th>Intensity</th>
				<th>Likelihood</th>
				<th>Relevance</th>
			</tr>
			{Data.map(item => {
          		return (
            		<tr key={item._id}>
              			<a target="blank" href={item.url}><td>{item.title}</td></a>
						<td>{item.source}</td>
						<td>{item.topic}</td>
						<td>{item.sector}</td>
						<td>{item.region}</td>
						<td>{item.country}</td>
						<td>{item.pestle}</td>
						<td>{item.end_year}</td>
						<td>{item.impact}</td>
						<td>{item.intensity}</td>
						<td>{item.likelihood}</td>
						<td>{item.relevance}</td>
           		 </tr>
          		)
        	})}
		</tbody>
		</table>
		</div>
		</div>
	)
}

export default Table
