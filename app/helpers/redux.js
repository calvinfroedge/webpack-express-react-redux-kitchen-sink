import { connect } from 'react-redux'

const stateConnector = function(){
  let stateKeys = Array.from(arguments);
  let obj={};
  return connect((state)=>{
    stateKeys.forEach((key)=>{
      obj[key] = state[key];
    });

    return obj;
  })
}.bind(null);

export {stateConnector};
