import React, { Component } from 'react';
import Results from './results-component';
import CustomForm from './customForm-component';

class App extends Component {
  constructor(){
    super()
    this.state = {
      inputString: '',
      mean: 0,
      median: 0,
      mode: [0]
    };
  }
  
  handleInputChange = (event) => {
    this.setState({ inputString: event.target.value });
  } 

  handleSubmit = (event) => {
    event.preventDefault()
    const stringArray = this.state.inputString.split(',');
    let nums = stringArray.map(item => Number(item));

    if ((nums.length > 0) && (!nums.includes(NaN))) {
      fetch('http://localhost:3001/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nums)
      })
      .then(resp => resp.json())
      .then(res => {
        this.setState({ mean: res[0], median: res[1], mode: res[2] }, () => console.log(this.state))
      })
      .catch((err) => console.log('error occured!'))
    } else {
      alert('Invalid input!');
    } 
  };


  render() {
    const { inputString, ...values } = this.state
    return (
      <div>
        <div id = 'background-image'></div>
        <nav>Summary Stats Calculator</nav>
        <div>
          <CustomForm handleInputChange = { this.handleInputChange } handleSubmit = { this.handleSubmit }/>
          <Results values = { values }/>
        </div>
      </div>
    );
  }
}

export default App;




