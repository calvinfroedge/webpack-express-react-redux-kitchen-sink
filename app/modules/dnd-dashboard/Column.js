import React, { Component, PropTypes } from 'react';
import Card from './Card';
import update from 'react/lib/update';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

const columnStyle = {
  width: '32%',
  minHeight: '30px',
  float: 'left',
  border: '3px dashed #ccc'
};

const columnTarget = {
  hover(props, monitor, component){
    let {addCardToColumn, id} = props;
    let dragItem = monitor.getItem();

    addCardToColumn(dragItem, id);
  }
};

@DropTarget(ItemTypes.CARD, columnTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
export default class Column extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    id: PropTypes.any.isRequired,
    addCardToColumn: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);

    let {cards} = this.props;

    this.state = {
      cards
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.columnChange){
      let newState = Object.assign({}, this.state, {cards: nextProps.cards});
      this.setState(newState);
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    let passedStyle = this.props.style || {};
    let Style = Object.assign({}, columnStyle, passedStyle);

    let cardComponents = cards.map((card, i) => {
      return (
        <Card key={card.id}
              index={i}
              id={card.id}
              column={card.column}
              columnWidth={columnStyle.width}
              columnGutter={10}
              text={card.text}
              moveCard={this.moveCard} />
      );
    })

    return connectDropTarget(
      <div style={Style}>
        {cardComponents}
      </div>
    );
  }
}
