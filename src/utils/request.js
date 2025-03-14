import axios from 'axios'

// axios 公共配置-http://geek.itheima.net
axios.defaults.baseURL= 'https://2325d3d8.r7.cpolar.top'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const result = response.data
  return result;
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // if(error.response && error.response.status !== 200){
  //   localStorage.removeItem('token')
  //   location.href = '../login/index.html'
  // }
  return Promise.reject(error);
});

export default axios