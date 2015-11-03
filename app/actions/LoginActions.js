import { baseRef } from '../constants/firebaseUtils'
import Reflux from 'reflux'
import debug from '../constants/debug'

const LoginActions = Reflux.createActions([
  'loggedIn',
  'loggedOut'
])

baseRef.onAuth((authData) => {
  if (authData) {
    LoginActions.loggedIn(authData)
  } else {
    LoginActions.loggedOut()
  }
})

LoginActions.login = () => {
  baseRef.authWithOAuthPopup('google', (error, authData) => {
    if (error && error.code === 'TRANSPORT_UNAVAILABLE') {
      baseRef.authWithOAuthRedirect('google', LoginActions.loginHandler, { scope: 'email' })
    } else {
      LoginActions.loginHandler(error, authData)
    }
  }, { scope: 'email' })
}

LoginActions.logout = () => {
  baseRef.unauth()
}

LoginActions.loginHandler = (error, authData) => {
  if (error) {
    debug.log(error, authData)
  }
}

export default LoginActions
