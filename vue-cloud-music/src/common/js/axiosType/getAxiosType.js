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

/**
 * 获取精品歌单
 * @returns {AxiosPromise<any>}
 */
export function getHighqualityList() {
  return axios.get(`${url}top/playList/highquality`)
}

/**
 * 获取歌单评论
 * @param id 必选
 * @param limit 可选，评论的数量，默认20
 * @returns {AxiosPromise<any>}
 */
export function getSongSheetComment(id, limit) {
  if (!limit) {
    limit = 20
  }
  return axios.get(`${url}comment/playlist?id=${id}&limit=${limit}`)
}

/**
 * 获取歌曲评论
 * @param id 必选
 * @param limit 可选，评论的数量，默认20
 * @returns {AxiosPromise<any>}
 */
export function getMusicComment(id, limit) {
  if (!limit) {
    limit = 20
  }
  return axios.get(`${url}comment/music?id=${id}&limit=${limit}`)
}
//
// /**
//  * 新碟专辑
//  * @returns {AxiosPromise<any>}
//  */
// export function newAlbum(id) {
//   if (id) {
//     return axios.get(`${url}top/album?id=${id}`)
//   }
//   return axios.get(`${url}top/album`)
// }

/**
 *
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function getUserDetail (id) {
  return axios.get(`${url}user/detail?uid=${id}`)
}
