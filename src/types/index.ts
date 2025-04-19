export type User = {
  guid: string;
  balance: string;
  picture?: string;
  name: { first: string; last: string };
  email: string;
  phone: string;
  age: number;
  eyeColor: string;
  company: string;
  address: string;
};

export type FormValues = {
  first: string;
  last: string;
  email: string;
  phone: string;
  age: number;
  eyeColor: string;
  company: string;
  address: string;
};

export interface LoginFormInputs {
  email: string;
  password: string;
}
