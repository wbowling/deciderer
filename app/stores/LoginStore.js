import LoginActions from '../actions/LoginActions'
import Reflux from 'reflux'

const data = {
  uid: null,
  email: null,
  loggedIn: false
}

const LoginStore = Reflux.createStore({
  listenables: LoginActions,
  onLoggedIn(authData) {
    data.email = authData.google.email
    data.uid = authData.uid
    data.loggedIn = true
    this.trigger(data)
  },

  onLoggedOut() {
    data.email = null
    data.uid = null
    data.loggedIn = false
    this.trigger(data)
  },

  getEmail() {
    return data.email
  },

  getUid() {
    return data.uid
  },

  isLoggedIn() {
    return data.loggedIn
  }

})

export default LoginStore
