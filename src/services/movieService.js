/* eslint-disable import/prefer-default-export */
import http from './httpService';

const apiEndpoint = '/post';

export async function postRaportReq(options) {
  const status = await http.post(apiEndpoint, options);
  return status;
}
