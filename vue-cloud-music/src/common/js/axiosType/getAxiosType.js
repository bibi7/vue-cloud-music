import axios from 'axios'

const url = 'http://120.79.162.149:3000/';

/**
 * 获取首页banner信息
 * @returns {AxiosPromise<any>}
 */
export function getBanner() {
  return axios.get(`${url}banner`)
}


