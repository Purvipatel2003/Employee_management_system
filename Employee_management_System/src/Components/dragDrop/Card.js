// import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// class Card extends Component {
export const Card = (props) => {
  // constructor(props) {
  //   super(props);
  // }

  // const handleKeyDown = (e) => {
  //   e.target.style.height = "inherit";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  const handleDragStart = (e, card, parent) => {
    card.previousParent = parent;
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  // render() {
  let card = { id: props.id, title: props.title };
  //const Card = React.forwardRef((props, ref) => (

  // );
  return (
    <div
      className="card"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card, props.parent)}
    >
      <div className="card__field">{props.title}</div>
    </div>
  );
  // return (
  //   <div
  //     className="card"
  //     draggable="true"
  //     onDragStart={(e) => handleDragStart(e, card, props.parent)}
  //   >
  //     {/* {props.orientation === "left" ? (
  //       <span> </span>
  //     ) : (
  //       <span
  //         onClick={(event) => props.onClick(event, card, props.parent)}
  //         className="leftNav"
  //       >
  //         <FontAwesomeIcon size="2x" icon={faCaretLeft} />
  //       </span>
  //     )} */}
  //     <div className="card__field">{props.value}</div>
  //     {/* <textarea
  //       draggable="false"
  //       ref={props.cardField} //this talks with parent to give parent access to ref
  //       className="card__field"
  //       placeholder={"Add a new title..."}
  //       defaultValue={props.title ? props.title : null}
  //       value={props.value}
  //       onKeyUp={handleKeyDown}
  //       onBlur={(event) => {
  //         props.onCardBlur(event, card, props.parent);
  //       }}
  //     /> */}
  //     {/* {props.orientation === "right" ? (
  //       <span> </span>
  //     ) : (
  //       <span
  //         className="rightNav"
  //         onClick={(event) => props.onClick(event, card, props.parent)}
  //       >
  //         <FontAwesomeIcon size="2x" icon={faCaretRight} />
  //       </span>
  //     )} */}
  //   </div>
  // );
  // // }
};

// export default Card;
