import axios from "axios";
class Authentication {
  constructor() {
    this.authenticated = false;
  }

  login(CallBack) {
    this.authenticated = true;
    CallBack();
  }

  logout(CallBack) {
    this.authenticated = false;
    CallBack();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();
