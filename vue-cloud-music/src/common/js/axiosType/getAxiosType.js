import axios from 'axios'
// const url = 'http://120.79.162.149:3000/';
// const url = 'http://192.168.129.122:3000/';
const url = 'http://localhost:3000/';


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

/**
 * 获取首页最新音乐
 * @returns {AxiosPromise<any>}
 */
export function getNewMusic() {
  return axios.get(`${url}personalized/newsong`)
}

/**
 * 获取歌单信息
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function getMusicListInfo(id) {
  return axios.get(`${url}playlist/detail?id=${id}`)
}

/**
 * 获取歌曲链接
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function getMusicUrl(id) {
  return axios.get(`${url}music/url?id=${id}`)
}
