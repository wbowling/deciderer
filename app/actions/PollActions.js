import Reflux from 'reflux'

const PollActions = Reflux.createActions([
  'switchPoll',
  'addPlace',
  'deletePlace',
  'vote',
  'createPoll'
])

export default PollActions
