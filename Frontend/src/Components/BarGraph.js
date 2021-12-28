import React,{useEffect} from 'react';
import * as d3 from 'd3';
import "../PiePage.css";
function BarGraph(props) {
  const {
    data
  } = props;
  var margin = {top: 30, right: 30, bottom: 30, left: 40};
  const width = 600 - margin.left - margin.right;
	 const height = 450 - margin.top - margin.bottom;

	function drawChart() {
		d3.select('#bar-container')
		.select('svg')
		.remove();

		const svg = d3
		  .select('#bar-container')
		  .append('svg')
		  .attr('width',width + margin.left + margin.right+50)
		  .attr('height', height +100)
		  .append('g')
		  .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


		var x = d3.scaleBand()
		  .range([ 0, width ])
		  .domain(data.map(function(d) { return d._id; }))
		  .padding(0.2);
		svg.append("g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x))
		  .selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");
		
		var y = d3.scaleLinear()
		  .domain([0, 700])
		  .range([ height, 0]);
		svg.append("g")
		  .call(d3.axisLeft(y));

		svg.selectAll()
		  .data(data)
		  .enter()
		  .append("rect")
			.attr("x", function(d) { return x(d._id); })
			.attr("y", function(d) { return y(d.count); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return height - y(d.count); })
			.attr("fill", "red")
		
		}

  useEffect(() => {
    drawChart();
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

 
  return <div className='bg-not' id="bar-container" />;
}

export default BarGraph;
