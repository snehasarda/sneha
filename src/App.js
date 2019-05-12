import React ,{Component}from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Cards from './Card'
import {Row} from 'antd';
class App extends Component {
state ={
  loading:true,
  data:[]
}
componentDidMount()
{
  axios.get('https://jsonplaceholder.typicode.com/users').then(response =>{
   this.setState({
     loading:false,
     data:response.data
   });
  });

}
cardDeleteHandler=(cardIndex)=>{
const newdata=[...this.state.data];
console.log(newdata);
newdata.splice(cardIndex,1);
console.log(newdata);
this.setState({data:newdata});

}

cardUpdateHandler = (index,values)=>{
  
const newArray = [...this.state.data];
console.log(newArray);
const updateArray = newArray.map((entry ,mapIndex)=>{
  if(mapIndex === index){
    return {...entry, ...values};

  } 
  return entry;
});
 this.setState({
   data: updateArray,
  });
}

render(){

if(this.state.loading){
  return(<div className="spinner">
  <div className="bounce1"></div>
  <div className="bounce2"></div>
  <div className="bounce3"></div>
</div>);
}else{
  const cards = this.state.data.map((card,index)=>{return<Cards key={card.id}
                                                       name={card.name} 
                                                       email={card.email}
                                                       website={card.website}
                                                       phone={card.phone}
                                                       username={card.username}
                                                       clicked={()=>this.cardDeleteHandler(index)}
                                                       cardUpdateHandler={this.cardUpdateHandler}
                                                       index={index} 
                                                       />})
  return (
    <Row >
    <div className="App">
    
    {cards}
    
    </div>
    </Row>
  );
}
  
  
}

  }

export default App;
