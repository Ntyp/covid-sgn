import React , { Component , useState , useEffect} from 'react';
import './App.css';
import moment from 'moment'
import ChartRace from 'react-chart-race';
import randomColor from "randomcolor";
export default function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [dataChart, setDataChart] = useState([])
  var dayout = 30;


  /* const datachart = [{
    id:"",
    title:"",
    value:"",
    color:""
  }] */
// **********************************************
    // Random Color
// **********************************************

  const randomColor = () => {
    return 'rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255})';
  }

  

// **********************************************
    // Fetch & Set Interval Data
// **********************************************


  const tick = () => {
    if(count <28) {
      setCount(count+1)
      
    }
    else{
      setCount(0)
    }
  }

 

  useEffect (() => {
    fetch("https://disease.sh/v3/covid-19/historical?lastdays=30")
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
      
      console.log(data)
  }, [] )

  let data_date = []
  for(let i=0;i<=data.length;i++)
  {
    if(data_date[i] == 1)
    {
      data_date[1] = moment().format('M/D/YY');
    }
    data_date[i] = moment().subtract(29-i, 'days').format('M/D/YY');
    // console.log(data_date[i])
  }
  
  useEffect(() => {
    const interval = setInterval(tick,300)
    let tempData = [];
    let colorx11 = ['#CC0000','#CC0066','#CC3300','#CC6600','#CC9900','#CCCC00','#CCFF00','#99FF00','#99CC00','#999900']
    data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((item,index)=>{
      const model =  {
          id:index,
          title:item.country,
          value:item.timeline.cases[data_date[count]],
          color:colorx11[index]
      }
      
      /* tempData.push(model) */
      if(index < 10) {
        tempData.push(model)
      }
      return 
      
    })
    // console.log("tempData =>",tempData)
    // console.log("dataChart",dataChart)
    setDataChart(tempData)
    // ChangeData
    // const datachart = [{id:{},title:{},value:{},color:{}}]    //Convert data to datachart type : id = {index} title = {country} + {province} value: {timeline.date[data_date[count]]} color:{???}

    return () => {
        
        clearInterval(interval)
    }
  },[count])
  
  // useEffect(() => {
  //   let tempcolor = [];
  //   data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((item,index)=>{
  //     const colorx = { 
  //       color:randomColor({index})
  //     }
  //     if(index < 10) {
  //       tempcolor.push(colorx)
  //     }
      
  //     return
  //   })
  //   console.log("tempColor =>",tempcolor)
  //   setDataChart(tempcolor)
  // },[])

  // useEffect(() => {
  //   let tempColor
  //   data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((item,index)=>{
  //     const colorx = {
  //       color:randomColor()
  //     }
  //   }
  // })
  // },[])
  

  // useEffect(() => {
  //   let colordata = [];
  //   data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((item,index)=>{
  //     const model =  {
  //         color:randomColor()
  //     }
  //     return 
  //   })
  //   setDataChart(colordata)
  
  // },[count])
  // useEffect(() => {
  //   data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((item,index)=>{
  //     const model =  {
  //         id:index,
  //         title:item.country,
  //         value:item.timeline.cases[data_date[count]],
  //         color:''
  //     }
  // })
  

  




// **********************************************
// **********************************************




// **********************************************
    // Set Date to Array
// **********************************************


  
// {dataChart.map((item , index) => (
//   dataChart.color = randomColor()
//   console.log(dataChart.color)
// ))}

// **********************************************
// **********************************************


 
  return(
    
    <div>
      <center>
        <h2>Covid Global Cases by SGN</h2>
        <span>Date:</span><span>{data_date[0+count]}</span> <br></br>
        
        
        <ChartRace
        data={dataChart}
        backgroundColor='#000'
        width={1000}
        padding={50}
        itemHeight={15}
        gap={12}
        titleStyle={{ font: 'normal 400 13px Arial', color: '#fff' }}
        valueStyle={{ font: 'normal 400 11px Arial', color: 'rgba(255,255,255, 0.42)' }}
      />
      </center>
      
      {/* {data.sort((a,b)=>b.timeline.cases[data_date[count]] - a.timeline.cases[data_date[count]]).map((el , index)  => (
        <div>
          
          <center>
          
          </center>
            
        </div>
      ))} */}

      <center>

      </center>
    </div>
  )
}



{/* <ul>
            <li key={index}> {index}.{el.country}{el.province} =   {el.timeline.cases[data_date[count]]}   </li>
          </ul> */}














