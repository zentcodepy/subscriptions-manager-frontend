import axios from "axios";
import { useRouter } from "vue-router";

export function interceptResponse() {
  const router = useRouter();
  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );
}
