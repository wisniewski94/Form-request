import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response
    && error.response.status >= 400
    && error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    if (error.message === 'Network Error') {
      toast.error('This server is running most likely on localhost which doesn\'t support CORS Policy');
    } else {
      toast.error('An unexpected error occurrred.');
    }
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
