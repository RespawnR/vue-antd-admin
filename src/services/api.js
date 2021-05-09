//跨域代理前缀
const API_PROXY_PREFIX='/refresh_api/admin'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,

  GETALLPOSTS: `${BASE_URL}/articles`
  
}
