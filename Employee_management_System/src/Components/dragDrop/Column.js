import React, { Component } from "react";
import { Card } from "./Card";
// import Card from "./card";

// class Column extends Component {
export const Column = (props) => {
  // class Column extends Component {
  // constructor(props) {
  //   super(props);
  //   cardField = React.createRef();
  // }
  // const cardField = React.createRef();
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const capitalizeFirstLetter = (string) => {
    return string.replace(string[0], string[0].toUpperCase());
  };

  // render() {
  return (
    <div
      className="column drag-and-drop"
      onDrop={(e) => props.onHandleDrop(e, props.name)}
      onDragOver={(e) => handleDragOver(e)}
      // onDragEnter={e => handleDragEnter(e)}
      // onDragLeave={e => handleDragLeave(e)}
    >
      <h4 className={['dark', "column__header"].join(" ")}>
        {capitalizeFirstLetter(props.name)}
      </h4>
      {props.cards.map((card, index, arr) => {
        return (
          <Card
            parent={props.name}
            // onClick={props.onNavClick}
            onCardBlur={props.onCardBlur}
            orientation={props.orientation}
            id={card.id}
            key={card.id}

            title={card.title}
            // cardField={
            //   arr.length - 1 === index
            //     ? (textArea) => (cardField = textArea)
            //     : null
            // } //set ref to child text area, pass as prop
          />
        );
      })}
      {/* <button
        className={"column__add-card"}
        onClick={() => {
          props.onClick();
          // setTimeout(() => {
          //   cardField.focus();
          // }, 0);
        }}
      >
        Add a card +
      </button> */}
    </div>
  );
  // }
};

// export default Column;
