import React, {Component} from 'react';
import CardContainer from './card-container-component';

class App extends Component {
  constructor(){
    super()
    this.state = {
      tasks: [
        {
          name: "Add More Tasks",
          category: "todo"
        }
      ]
    }

  }
   

  handleDragOver = event => {
    event.preventDefault();
  };

  handleDragStart = (event, name) => {
    event.dataTransfer.setData("id", name);
  };

  handleDrop = (event, cat) => {
    const id = event.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter(task => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    });
  };

  handleKeyUp = event => {
    if ((event.key === "Enter") && (event.target.value !== "")) {
      this.setState({
        tasks: [
          ...this.state.tasks,
          { name: event.target.value, category: "todo" }
        ]
      });
      event.target.value = "";
    }
    if (event.key === 'Escape') {
      event.target.value = "";
    }
    // console.log(event.target.value)
  };


  render() {
    var categories = {
      todo: [],
      working: [],
      complete: [],
      trash: []
    };

    this.state.tasks.forEach(task => {
      categories[task.category].push(
        <div
          className = "item-container"
          key = {task.name}
          draggable
          onDragStart = {event => this.handleDragStart(event, task.name)}
        >
          {task.name}
        </div>
      );
    });   

    return (
      <div>
        <div id = 'background-image'></div>
        <nav>Trello Clone</nav>
        <div className = "container">
          <CardContainer 
          dragOver = {this.handleDragOver}
          drop = {this.handleDrop} 
          category = 'todo' 
          task = {categories.todo}/>
          <CardContainer 
          dragOver = {this.handleDragOver}
          drop = {this.handleDrop} 
          category = 'working' 
          task = {categories.working}/>
          <CardContainer 
          dragOver = {this.handleDragOver}
          drop = {this.handleDrop} 
          category = 'complete' 
          task = {categories.complete}/>
        </div>
        <div>
          <input
            onKeyUp = {event => this.handleKeyUp(event)}
            className = "input"
            id = 'inputText'
            type = "text"
            placeholder = "Enter the task"
          />
          <div
            className = "trash-drop"
            onDrop = {event => this.handleDrop(event, "trash")}
            onDragOver = {event => this.handleDragOver(event)}
          >
            Drop here to remove
          </div>
        </div>
      </div>
    );
  }
}

export default App;
