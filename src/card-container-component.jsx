import React from 'react';

const CardContainer = (props) => {
  return (
    <div
      className = "card-container"
      onDragOver = {event => props.dragOver(event)}
      onDrop = {event => props.drop(event, props.category)}
    >
    <h1>{props.category}</h1>
      {props.task}
    </div>
    );

}

export default CardContainer;