import PollActions from '../actions/PollActions'
import Reflux from 'reflux'
import { baseRef } from '../constants/firebaseUtils'
import LoginStore from './LoginStore'
import debug from '../constants/debug'

let data = {

}

const PollStore = Reflux.createStore({
  listenables: PollActions,

  onSwitchPoll(poll) {
    if (data.poll) {
      baseRef.child('polls').child(data.poll).off('value')
    }
    baseRef.child('polls').child(poll).on('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        data = dataSnapshot.val()
        data.poll = dataSnapshot.key()
        data._places = data.places
        data.places = data.places ? Object.keys(data.places) : []
        debug.log(data)
      } else {
        data.error = "Poll doesn't exist"
      }
      this.trigger(data)
    })
  },
  onAddPlace(place) {
    if (LoginStore.isLoggedIn()) {
      baseRef.child('polls').child(data.poll).child('places').child(place).set(LoginStore.getUid())
    }
  },
  onDeletePlace(place) {
    if (LoginStore.isLoggedIn() && this.canDeletePlace(place)) {
      baseRef.child('polls').child(data.poll).child('places').child(place).remove()
    }
  },
  onCreatePoll(enddate, title) {
    if (LoginStore.isLoggedIn()) {
      const ref = baseRef.child('polls').push({ admin: LoginStore.getUid(), enddate: enddate, title: title })
      PollActions.switchPoll(ref.key())
    }
  },
  onVote(vote) {
    if (LoginStore.isLoggedIn()) {
      const email = LoginStore.getEmail()
      const userRef = baseRef.child('polls').child(data.poll).child('users').child(LoginStore.getUid())
      userRef.child('email').once('value', (snapshot) => {
        if (!snapshot.exists()) {
          snapshot.ref().set(email)
        }
      })
      userRef.child('votes').child(vote.name).set(vote.value)
    }
  },
  hasVoted(name) {
    if (LoginStore.isLoggedIn() && data.users) {
      const userVotes = data.users[LoginStore.getUid()]
      return (userVotes && userVotes.votes && userVotes.votes[name] && userVotes.votes[name] === 1) ? true : false
    } else {
      return false
    }
  },
  canVote() {
    return (LoginStore.isLoggedIn() && this.isPollActive())
  },
  isPollActive() {
    return (this.hasPoll() && new Date().getTime() < data.enddate)
  },
  isAdmin() {
    return (LoginStore.isLoggedIn() && LoginStore.getUid() === data.admin)
  },
  hasPoll() {
    return (data.poll != null)
  },
  canDeletePlace(place) {
    if (LoginStore.isLoggedIn() && data._places && data._places[place] && data._places[place] === LoginStore.getUid()) {
      return true
    } else if (this.isAdmin()) {
      return true
    } else {
      return false
    }
  }
})

export default PollStore
