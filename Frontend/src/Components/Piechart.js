
import React,{useEffect} from 'react';
import * as d3 from 'd3';
import "../PiePage.css";
function PieChart(props) {
  const {
    data,
    outerRadius,
    innerRadius,
	varia,
  } = props;


const heightmap={"intensity":"600","likelihood":"370","relevance":"370","impact":"370","start_year":"400","end_year":"400","country":"600","topic":"600","region":"600","sector":"550"}
  const margin = {
    top: 0, right: 250, bottom: 10, left:0,
  };

  const width = 2 * outerRadius + margin.left + margin.right+100;

  const height = heightmap[varia];
  console.log(height);

  const colorScale = d3     
  .scaleSequential()      
  .interpolator(d3.interpolateCool)      
  .domain([0, data.length]);
	function drawChart() {
		var size = 20;
		d3.select('#pie-container')
		  .select('svg')
		  .remove();

		const svg = d3
		  .select('#pie-container')
		  .append('svg')
		  .attr('width', width)
		  .attr('height', height)
		  .append('g')
		  .attr('transform', `translate(200, 200)`);

		const arcGenerator = d3
		  .arc()
		  .innerRadius(innerRadius)
		  .outerRadius(outerRadius);
	
		const pieGenerator = d3
		  .pie()
		  .value((d) => d.count);
	
		const arc = svg
		  .selectAll()
		  .data(pieGenerator(data))
		  .enter();
	
		arc
		  .append('path')
		  .attr('d', arcGenerator)
		  .style('fill', (_, i) => colorScale(i))
		  .style('stroke', '#ffffff')
		  .style('stroke-width', 0);
	
		arc
		  .append("rect")
		  .attr("x", 210)
		  .attr("y", function(d,i){ return  i*(size+5)-150}) 
		  .attr("width", size)
		  .attr("height", size)
		  .style("fill", (_, i) => colorScale(i))
		arc
		  .append("text")
		  .attr("x", 210 + size*1.2)
		  .attr("y", function(d,i){ return  i*(size+5) + (size/2)-150}) 
		  .style("fill", (_, i) => colorScale(data.length - i))
		  .text((d)=> d.data._id)
		  .attr("text-anchor", "right")
		  .style("alignment-baseline", "middle")
		arc
		  .append('text')
		  .attr('text-anchor', 'middle')
		  .attr('alignment-baseline', 'middle')
		  .text((d) => d.data.count)
		  .style('fill', (_, i) => colorScale(data.length - i))
		  .attr('transform', (d) => {
			const [x, y] = arcGenerator.centroid(d);
			return `translate(${x}, ${y})`;
		  });
	  }   

  useEffect(() => {
    drawChart();
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

 
  return <div className='bg-not1' id="pie-container" />;
}

export default PieChart;