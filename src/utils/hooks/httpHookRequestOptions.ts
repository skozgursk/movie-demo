type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpHookRequestOptions {
  method: HttpMethod;
  body?: any;
}