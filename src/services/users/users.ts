import { instanceAPI } from '../axiosConfig';
import { FormValues } from '../../types/index';

export const getUser = (id: string, token: string) => {
  return instanceAPI.get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateUser = (id: string, data: FormValues, token: string) => {
  return instanceAPI.put(`/users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};
