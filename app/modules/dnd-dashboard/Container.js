import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Column from './column';

const containerStyle = {
};

let cards = [
  {
    id: 1,
    text: 'Write a cool JS library',
    column: 1
  },
  {
    id: 2,
    text: 'Make it generic enough',
    column: 1
  }, 
  {
    id: 3,
    text: 'Write README',
    column: 1
  },
  {
    id: 4,
    text: 'Create some examples',
    column: 2
  }, 
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    column: 2
  }, 
  {
    id: 6,
    text: '???',
    column: 3
  }, 
  {
    id: 7,
    text: 'PROFIT',
    column: 3
  }
]

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);

    let columns = 3;

    let {addCardToColumn} = this;

    this.state = {cards, columns, columnChange: false}
  }

  componentDidUpdate(){
    let {columnChange} = this.state;

    if(columnChange) this.setState({columnChange: false});
  }

  cardsByColumn(columnNumber){
    let arr = [];
    let {cards} = this.state;

    return cards.filter((card)=> card.column==columnNumber);
  }

  findCardIndex(id){
    let {cards} = this.state;
    for(var i=0;i<cards.length;i++){
      if(cards[i].id == id) return i;
    }
  }
  
  addCardToColumn(item, column){
    let {id} = item;
    let {cards} = this.state;
    let index = this.findCardIndex(id);

    //Make sure the card isn't already added to the column
    if(cards[index].column == column){
      let newState = Object.assign({}, this.state, {columnChange: false});
      return;
    } else {
      cards[index].column = column;
      let newState = Object.assign({}, this.state, {cards, columnChange: true});
      this.setState(newState);
    }
  }

  render() {
    let columnMethods = {addCardToColumn: this.addCardToColumn.bind(this)}
    let columns = [];
    let {columnChange} = this.state;

    for(var i=0;i<this.state.columns;i++){
      columns.push(
        <Column 
          key={i+1} 
          id={i+1}
          style={{marginRight: (i+1 < this.state.columns) ? '10px' : '0px'}}
          cards={this.cardsByColumn(i+1)}
          columnChange={columnChange}
          {...columnMethods} />
        );
    }

    return (
      <div style={containerStyle}>
        {columns}
      </div>
    );
  }
}
