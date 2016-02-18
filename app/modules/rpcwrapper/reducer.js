import { NETWORK_REQUEST_COMPLETED, NETWORK_REQUEST_IN_PROGRESS } from './constants'

const initialState = {
  network_requests_in_progress: []
}

export default function network(state = initialState, action) {
  if(action.type === NETWORK_REQUEST_IN_PROGRESS) {
    let {request_time, request_url} = action;

    return Object.assign({}, state, {
      network_requests_in_progress: state.network_requests_in_progress.concat({request_time, request_url})
    });
  }
  else if(action.type === NETWORK_REQUEST_COMPLETED) {
    let network_requests_in_progress = state.network_requests_in_progress.filter(function(item){
      return item.request_url != action.request_url && item.request_time != action.request_time;
    });

    return Object.assign({}, state, {
      network_requests_in_progress
    });
  }

  return state
}
