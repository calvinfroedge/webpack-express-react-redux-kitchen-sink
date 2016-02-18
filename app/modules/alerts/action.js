import { CREATE_ALERT, DISMISS_ALERT } from './constants'

export function createAlert(message, type){
  return {
    type: CREATE_ALERT,
    message,
    alert_type: type
  }
}

export function dismissAlert(alert_){
  alert_.type = DISMISS_ALERT;

  return alert_;
}
