import React,{useEffect,useState} from 'react'
import * as d3 from 'd3';
import Axios from 'axios';
function CircularBar(props) {
	const {
		variable,
		uniq
	  } = props;

	const [Data, setData] = useState([]);
	const fetchData = async () => {
		const { data } = await Axios.get(`http://localhost:8080/count/${variable}`);
		setData(data);
	  };
	  useEffect(() => {
		fetchData();
	  }, [variable]);// eslint-disable-line react-hooks/exhaustive-deps
	var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   
	function drawChart() {
		d3.select(`#${uniq}`)
		.select('svg')
		.remove();
		const svg = d3
		  .select(`#${uniq}`)
		  .append('svg')
		  .attr('width',700)
		  .attr('height', height + margin.top + margin.bottom)
		  .append('g')
		  .attr('transform', "translate(" + (400) + "," + (height / 2 + margin.top) + ")");

		var x = d3.scaleBand()
			.range([0, 2 * Math.PI])    
			.align(0)
			.domain(Data.map(function(d) { return d._id; }))             

			var y = d3.scaleRadial()
				.range([innerRadius, outerRadius])  
				.domain([0, 14000]); 


			svg.append("g")
				.selectAll("path")
				.data(Data)
				.enter()
				.append("path")
				.attr("fill", "#69b3a2")
				.attr("d", d3.arc()   
					.innerRadius(innerRadius)
					.outerRadius(function(d) { return y(d.count); })
					.startAngle(function(d) { return x(d._id); })
					.endAngle(function(d) { return x(d._id) + x.bandwidth(); })
					.padAngle(0.01)
					.padRadius(innerRadius))


			svg.append("g")
				.selectAll("g")
				.data(Data)
				.enter()
				.append("g")
					.attr("text-anchor", function(d) { return (x(d._id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })// eslint-disable-next-line
					.attr("transform", function(d) { return "rotate(" + ((x(d._id) + x.bandwidth() / 2) * (180 / Math.PI) - 90) + ")"+"translate(" + (y(d.count)+10) + ",0)"; })
				.append("text")
					.text(function(d){return(d._id)})
					.attr("transform", function(d) { return (x(d._id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
					.style("font-size", "11px")
					.attr("alignment-baseline", "middle")
	}
	useEffect(() => {
		drawChart();
	  }, [Data]);// eslint-disable-line react-hooks/exhaustive-deps
	
	 
	  return (<div className='bg-not' id={uniq} ><center><h1><strong>Circular barplot on {variable}</strong></h1></center></div>);
	}
	

export default CircularBar
