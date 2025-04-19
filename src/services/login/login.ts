import { instanceAPI } from '../axiosConfig';
interface ILoginData {
  email: string;
  password: string;
}

export const login = (data: ILoginData) => {
  return instanceAPI.post(`/auth/login`, data);
};
