import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Collapse from 'react-collapse';

function mapState(state){
  return state;
}

let fullScreenStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

let containerStyles = {

}

let headerStyles = {
  position: 'relative'
}

let panelControlStyles = {
  position: 'absolute',
  top: '0.5em',
  right: '0.5em',
  cursor: 'pointer'
}

@connect(mapState)
export default class ECFContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullscreen: false,
      expanded: true
    }
  }

  toggleFullscreen(){
    this.setState({fullscreen: !this.state.fullscreen})
  }

  toggleExpand(){
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    let {fullscreen} = this.state;
    let rootStyle = fullscreen ? Object.assign({}, containerStyles, fullScreenStyles) : containerStyles;

    return (
      <div className="panel panel-default" style={rootStyle}>
        <div className="ecf-heading panel-heading" style={headerStyles}>
          <div className="ecf-controls" style={panelControlStyles}>
            <ReactTooltip effect="solid" />
            <FontAwesome name="arrows-v" data-tip={this.state.expanded ? 'Collapse' : 'Expand'} style={{marginRight: '1em', padding: '0.25em'}} onClick={this.toggleExpand.bind(this)} />
            <FontAwesome name="expand" data-tip={this.state.fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'} onClick={this.toggleFullscreen.bind(this)} style={{padding: '0.25em'}} />
          </div>
          <h3 className="panel-title">{this.props.title || 'ECF Container'}</h3>
        </div>
        <div className="ecf-body panel-body">
          <Collapse isOpened={this.state.expanded}>
            {this.props.children}
            This is some content
          </Collapse>
        </div>
      </div>
    );
  }
}
