import axios from "axios";
import { useRouter } from "vue-router";

export function interceptResponse() {
  const router = useRouter();
  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 401:
          router.push("/login");
          break;
        case 403:
          router.push("/login");
        default:
          alert("error");
          break;
      }

      return Promise.reject(error);
    }
  );
}
