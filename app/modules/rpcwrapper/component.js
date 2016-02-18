import React from 'react';
import { connect } from 'react-redux';
import { sendNetworkRequest } from './action';

function mapState(state){
  return state;
}

@connect(mapState)
export default class RPCWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {fetching: false}
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentWillMount(){
    this._isMounted = true;
    const {initialLoad} = this.props;

    if(initialLoad){
      const {resource} = initialLoad;

      if(resource){
        if(this._isMounted) this.setState({fetching: true})
        this.networkRequest(resource, 'get').then( (data)=>{
          if(this._isMounted) this.setState({data, fetching: false})
          return data;
        });
      }
    }
  }

  networkRequest(resource, method='get', body={}, opts={}){
    let dispatch = this.props.dispatch;

    if(method == 'get' && this._isMounted) this.setState({fetching: true});
    return sendNetworkRequest(dispatch, resource, method, body, opts).then((result)=>{
      if(method == 'get' && this._isMounted) this.setState({fetching: false});

      if(result.status >= 400 && result.status < 600){
        throw new Error(result.response);
      } else {
        return result.response;
      }
    });
  }

  render() {
    let {data, fetching} = this.state;
    let propsToPass = {data, fetching, networkRequest: this.networkRequest.bind(this)}

    let childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, (propsToPass) ? propsToPass : {});
    });

    let loadingType = this.props.loadingType || 'bars';
    let loadingColor = this.props.loadingColor || '#ccc';

    return (
      <div>
        <p>rpcwrapper</p>
        {fetching ? <div>loading...</div> : childrenWithProps}
      </div>
    );
  }
}
