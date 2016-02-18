import fetch from 'isomorphic-fetch';

const productionURL = (process.env.PRODUCTION_URI) ? process.env.PRODUCTION_URL : 'http://localhost/';
const developmentURL = (process.env.DEVELOPMENT_URI) ? process.env.DEVELOPMENT_URL : 'http://localhost:3000/';
const URL = (process.env.NODE_ENV == 'development') ? developmentURL : productionURL;

export function request(resource, method, body={}, opts={}){
  method = method.toUpperCase();

  let args = {
      method,
      headers: {}
  };

  try {
      var headerValue = localStorage.getItem('userToken');
      args.headers['Authorization'] = 'Bearer ' + headerValue;
      args.headers['Content-Type'] = 'application/json';
  } catch(e){}

  if('headers' in opts){
      for(var key in opts.headers){
          args.headers[key] = opts.headers[key];
      }
  }

  if(method != 'GET') args.body = JSON.stringify(body);

  var result = fetch(URL + resource, args)
  return result;
}

export function get(resource, body={}, opts={}){
  var str = [];
  for(var p in body){
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }

  let query = (str.length > 0) ? str.join('&') : '';

  return request(resource + query, 'GET', {}, opts);
}

export function post(resource, body={}, opts={}){
  return request(resource, 'POST', body, opts);
}

export function put(resource, body={}, opts={}){
  return request(resource, 'PUT', body, opts);
}

export function del(resource, body={}, opts={}){
  return request(resource, 'DELETE', body, opts);
}
