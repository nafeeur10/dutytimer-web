import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const register = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/register", props)
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };
};
