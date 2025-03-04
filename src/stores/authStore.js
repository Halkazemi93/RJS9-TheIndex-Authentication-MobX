import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  user = null;

  setUser = token => {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    const decodedUser = jwt_decode(token);
    this.user = decodedUser;
  };

  signupUser = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  loginUser = async userData => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  logout = () => {
    this.setUser();
  };
}
decorate(AuthStore, {
  user: observable
});
const authStore = new AuthStore();
export default authStore;
