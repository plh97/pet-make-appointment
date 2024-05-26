import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { APPOINTMENT } from './interface';

interface ResponseType<T = unknown> {
  code: number;
  data: T;
  message: string;
}

interface List extends APPOINTMENT {}

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

export const request = <T>(params: AxiosRequestConfig) => {
  return axiosApi.request<ResponseType<T>, T>(params);
};

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
  get() {
    return request<{ list: APPOINTMENT[]; totalCount: number; page: number }>({
      url: '/api/list',
      method: 'GET',
    });
  },
};
