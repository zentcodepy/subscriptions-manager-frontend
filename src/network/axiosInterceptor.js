import axios from "axios";
import { useRouter } from "vue-router";

export function interceptResponse() {
  const router = useRouter();

  // Intercept request
  axios.interceptors.request.use(
    function (config) {
      // Show Loading Progress Bar
      NProgress.start();

      return config;
    },
    function (error) {
      console.log(error)
    }
  );

  // Intercept response
  axios.interceptors.response.use(
    function (config) {
      // Hide Loading Progress Bar
      NProgress.done();

      return config;
    },
    function (error) {
      // Hide Loading Progress Bar
      NProgress.done();

      const statusCode = error.response.status;

      switch (statusCode) {
        case 401:
          router.push("/login");
          break;
        case 403:
          router.push("/login");
          break;
        default:
          alert("error");
          break;
      }

      return Promise.reject(error);
    }
  );
}
