import React,{useEffect,useState} from 'react'
import WordCloud from "react-d3-cloud";
import Axios from 'axios';
function Wordgraph(props) {
	const {
		variable
	  } = props;

	const [Data, setData] = useState([]);
	const fetchData = async () => {
		const { data } = await Axios.get(`http://localhost:8080/count/${variable}`);
		setData(data);
	  };
	  useEffect(() => {
		fetchData();
	  }, [variable]);// eslint-disable-line react-hooks/exhaustive-deps

const fontSize = (Data) =>{
	return Math.random() * 1000 / 20;
}
const rotate = (Data) => (Math.random() * 1000 % 90) - 45;
	const newData = Data.map((item) => (
		
		{
		text: item._id,
		value: item.count
	  }));
	return (
		<div className='bg-not'>
			<center><h1><strong>WordCloud on {variable}</strong></h1></center>
			<WordCloud
				width={1000}
				height={750}
				data={newData}
				fontSize={fontSize}
				rotate={rotate}
				padding={2}
			/>
		</div>
	)
}

export default Wordgraph
