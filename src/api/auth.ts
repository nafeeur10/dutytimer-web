import Axios from "axios";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

interface AuthPropsType {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthPropsType = {}) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    Axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
        router.push("/login");
      })
  );

  const register = async ({ ...props }) => {
    Axios.post("http://localhost:8000/api/register", props)
      .then((result) => {
        mutate();
        setAuthToken(result.data.token);
        localStorage.setItem("authtoken", result.data.token!);
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const login = async ({ ...props }) => {
    Axios.post("http://localhost:8000/api/login", props)
      .then((result) => {
        mutate();
        setAuthToken(result.data.token);
        console.log(authToken)
        window.localStorage.setItem("authtoken", result.data.token!);
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const logout = async () => {
    if(!error) {
      const authTokenFromLocalStorage = localStorage.getItem("authtoken");
      await Axios.post("http://localhost:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${authTokenFromLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        mutate();
        console.log(res);
        
        // localStorage.removeItem("authtoken");
        // router.push("/login");
      }).catch((error) => {
        console.log(error);
        
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authtoken") !== null) {
      setAuthToken(localStorage.getItem("authtoken")!);
    }
    else {
      router.push('/login');
    }
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    // if (window.location.pathname === "/verify-email" && user?.email_verified_at) router.push(redirectIfAuthenticated)
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    logout,
  };
};
