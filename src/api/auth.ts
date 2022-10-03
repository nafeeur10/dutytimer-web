import Axios from 'axios'
import axios from "../lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

interface AuthPropsType {
  middleware?: string,
  redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthPropsType = {}) => {
  const router = useRouter();

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
        router.push('/login')
      }),
  )

  const register = async ({ ...props }) => {
    console.log(props)
    Axios
      .post("http://localhost:8000/api/register", props)
      .then(() => {
        mutate()
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const login = async ({ ...props }) => {
    console.log(props)
    Axios
      .post("http://localhost:8000/api/login", props)
      .then((result) => {
        mutate()
        console.log(result)
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const logout = async ({ ...props }) => {
    console.log("")
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    // if (window.location.pathname === "/verify-email" && user?.email_verified_at) router.push(redirectIfAuthenticated)
    // if (middleware === 'auth' && error) logout()
  }, [user, error]);

  return {
    user,
    register,
    login
  }
};
