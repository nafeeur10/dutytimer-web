import Axios from 'axios'
import axios from "../lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const register = async ({...props}) => {
    console.log(props)
    Axios
      .post("http://localhost:8000/api/register", props)
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const login = async ({...props}) => {
    console.log(props)
    Axios
      .post("http://localhost:8000/api/register", props)
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  return {
    register,
    login
}
};
