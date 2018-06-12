import axios from 'axios'

const url = 'http://120.79.162.149:3000/';

/**
 * 获取首页banner信息
 * @returns {AxiosPromise<any>}
 */
export function getBanner() {
  return axios.get(`${url}banner`)
}

/**
 * 获取首页推荐歌单
 * @returns {AxiosPromise<any>}
 */
export function getRecommend() {
  return axios.get(`${url}personalized`)
}

export function getNewMusic() {

}



