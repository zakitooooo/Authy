import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export interface User {
  id?: string;
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
}

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
