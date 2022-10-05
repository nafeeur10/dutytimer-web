import Axios from 'axios'
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

interface AuthPropsType {
  middleware?: string,
  redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthPropsType = {}) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>('')

  const { data: user, error, mutate } = useSWR('/api/user', () =>
  Axios
      .get('http://localhost:8000/api/user', { 
        headers: { 
          "Authorization": `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        } 
      })
      .then((res) => {
        let result = res.data
        console.log(result);
        
      })
      .catch(error => {
        if (error.response.status !== 409) throw  error
        router.push('/login')
      }),
  )

  const register = async ({ ...props }) => {
    console.log(props)
    Axios
      .post("http://localhost:8000/api/register", props)
      .then((result ) => {
        mutate()
        setAuthToken(result.data.token);
        localStorage.setItem("authtoken", authToken!);
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const login = async ({ ...props }) => {
    Axios
      .post("http://localhost:8000/api/login", props)
      .then((result) => {
        mutate()
        setAuthToken(result.data.token); 
        localStorage.setItem("authtoken", authToken!);
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const logout = async () => {
    localStorage.removeItem("authtoken");
    router.push('/login')
  }

  useEffect(() => {
    if(localStorage.getItem('authtoken') !== '') {
      setAuthToken(localStorage.getItem('authtoken'))
    }
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    // if (window.location.pathname === "/verify-email" && user?.email_verified_at) router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
  }, [user, error]);

  return {
    user,
    register,
    login
  }
};
