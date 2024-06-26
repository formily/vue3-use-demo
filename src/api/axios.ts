import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useGlobalStore } from "@/stores/global";

const NOT_LOGIN_CODE = -1
// const { accountInfo } = useGlobalStore();

console.log('axios base url', import.meta.env.VITE_BASE_URL)
// console.log("axios base url", process.env.VUE_APP_BASE_URL);
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000
  // headers: { token: accountInfo.token },
})

// axios.interceptors.request.use(resolve func, reject func)
// Add a request interceptor
instance.interceptors.request.use(
  async function (config: any) {
    // Do something before request is sent
    console.log('request 拦截: ', config)

    // 为所有请求加一个时间戳参数
    config.url += (config?.url?.includes('?') ? '&' : '?') + 't=' + +new Date()

    // config.headers = { token: accountInfo.token };
    // 防止刷新后，状态管理数据清空，导致找不到 token
    config.headers = {
      token: localStorage.getItem('config-fe-token')
    }
    return config // 用来请求的参数
  },
  function (error: any) {
    // Do something with request error
    ElMessage.error('请求异常, ' + error.message)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('响应拦截', response)

    // 如果身份校验失败，返回登录页
    // response.data.code === 111 && (window.location.href = response.data);

    const { code, msg, plainMsg } = response.data

    if (code !== 0) {
      ElMessage.error(plainMsg ? `${msg}: ${plainMsg}` : msg)
      // 如果是没有登录，跳转到登录页面
      if (code === NOT_LOGIN_CODE) {
        // router.push("/login");
        // TODO: 弹窗或跳转到登录页面
      }
    }

    return response?.data // 过滤掉除data参数外的其它参数，响应接收到的值。
    // return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    ElMessage.error('请求异常, ' + error.message)
    return Promise.reject(error)
  }
)

export default instance
