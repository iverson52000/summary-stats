import React, { Component } from 'react';
import Results from './Results';
import CustomForm from './CustomForm';

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

    // Input validation
    const stringArray = this.state.inputString.split(',');
    const nums = stringArray.map(item => {
      return (item !== '') ? Number(item) : NaN;
      });

    // Make API call
    if ((nums.length > 0) && (!nums.includes(NaN))) {
      fetch('http://localhost:3001/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nums)
      })
      .then(resp => resp.json())
      .then(res => {
        this.setState({ mean: res[0], median: res[1], mode: res[2] }, () => console.log(this.state));
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




