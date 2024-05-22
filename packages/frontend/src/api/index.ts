import axios, { AxiosError, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

interface ResponseType {
  code: number;
  data: any;
  message: string;
}

interface List {
  _id: string;
  name: string;
  description: string;
  time: Date;
  createAt: Date;
  updateAt: Date;
}

const axiosApi = axios.create({
  //   baseURL: `//${document.domain}:3000`,
  timeout: 5000, // 请求超时时间
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理200的逻辑
    const res = response.data;
    if (res.code !== 0) {
      ElMessage({
        message: res.message,
        type: 'error',
      });
    }
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status !== 401) {
      ElMessage({
        message: error.response.data?.message
          ? error.response.data?.message
          : 'Could not connect to server',
        type: 'error',
        duration: 2000,
      });
    }
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use((r: AxiosResponse) => {
  return r.data;
});

export const List = {
  create(data: List) {
    return axiosApi({
      url: '/api/list',
      method: 'POST',
      data,
    });
  },
  delete(id: string) {
    return axiosApi({
      url: '/api/list/' + id,
      method: 'DELETE',
    });
  },
  update(data: List) {
    return axiosApi({
      url: '/api/list/' + data._id,
      method: 'PATCH',
      data,
    });
  },
  get(): Promise<ResponseType> {
    return axiosApi.request<ResponseType, ResponseType>({
      url: '/api/list',
      method: 'GET',
    });
  },
};

// export const Account = {
//   userInfo(data: LoginType) {
//     return axiosApi.request<ResponseType, ResponseType>({
//       url: '/api/userInfo',
//       method: 'GET',
//       withCredentials: true,
//       data
//     });
//   },
//   login(data: LoginType) {
//     return axiosApi.request<ResponseType, ResponseType>({
//       url: '/api/login',
//       method: 'POST',
//       data
//     });
//   },
//   logout(data: LoginType) {
//     return axiosApi.request<UserInfoType, ResponseType>({
//       url: '/api/logout',
//       method: 'POST',
//     });
//   },
//   register(data: LoginType) {
//     return axiosApi.request<UserInfoType, ResponseType>({
//       url: '/api/register',
//       method: 'POST',
//       data
//     });
//   },
// };
