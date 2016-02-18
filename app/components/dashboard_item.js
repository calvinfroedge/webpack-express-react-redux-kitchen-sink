import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {createAlert} from '../modules/alerts';

class DashboardItem extends React.Component {
  componentWillMount(){
    console.log('props are', this.props);
  }

  getSomeData(){
    let {networkRequest} = this.props;

    networkRequest('bar', 'get');
  }

  submitData(data){
    let {networkRequest, dispatch, itemState} = this.props;

    let that = this;
    networkRequest('bop', 'post').then(function(result){
      console.log('result is', result);
    }).catch((error)=>{
      //roll back update
      console.log('rejected', error);
      that.props.dispatch(createAlert('An error has occurred', 'danger'));
    });
  }

  render() {
    return (
      <div>
        dashboard item

        <hr />
        
        <div>
          <ReactTooltip effect="solid" />
          <button data-tip="Just a hello world" onClick={this.getSomeData.bind(this)} className="btn btn-primary">Get some data</button>
        </div>
        <hr />

        <div>
          <button onClick={this.submitData.bind(this, {foo: 'bar'})} className="btn btn-primary">Post some data</button>
        </div>       

      </div>
    );
  }
}

function mapState(){
  return {};
}
export default connect(mapState)(DashboardItem);
