import { NETWORK_REQUEST_COMPLETED, NETWORK_REQUEST_IN_PROGRESS } from './constants'
let http = require('../../../lib/http');

//Internal API
function initializeNetworkRequest(resource, method, status, body, opts, time){
  return {
    type: NETWORK_REQUEST_IN_PROGRESS,
    request_url: resource,
    request_method: method,
    request_body: body,
    request_opts: opts,
    request_time: time
  }
}

//Public API
export function sendNetworkRequest(dispatch, resource, method, body={}, opts={}){
  let time = (new Date()).getTime();

  dispatch(initializeNetworkRequest(resource, method, body, opts, time));

  let status;
  return http[method](resource, body, opts).then((res)=>{
    status = res.status;
    return res.text();
  }).then((rawResponse)=>{
    let body;
    try {
      body = JSON.parse(rawResponse);
    } catch(e){
      body = rawResponse;
    }

    return body;
  }).then((body)=>{
    return dispatch(receiveNetworkRequest(body, resource, status, method, time))
  });
}

export function receiveNetworkRequest(responseBody, resource, status, method, time){
  let action = {
    type: NETWORK_REQUEST_COMPLETED,
    request_url: resource,
    request_method: method,
    request_time: time,
    response: responseBody,
    status: status,
    error: status >= 400 && status < 600
  }

  return action;
}
