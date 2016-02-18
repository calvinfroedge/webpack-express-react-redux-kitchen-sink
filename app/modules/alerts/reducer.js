import { CREATE_ALERT, DISMISS_ALERT } from './constants'

export default function alerts(state=[], action) {
  if(action.type === CREATE_ALERT) {
    console.log('action is', action);
    return state.concat({
      type: (action.alert_type || 'info'),
      message: (action.message || 'default alert message')
    })
  }
  else if(action.type === DISMISS_ALERT) {
    return state.filter(function(item){
      return item.message != action.message && item.alert_type != action.alert_type;
    });
  }

  return state
}
