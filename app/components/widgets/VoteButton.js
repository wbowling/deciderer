import React from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup } from 'react-bootstrap'
import LoginStore from '../../stores/LoginStore'
import PollStore from '../../stores/PollStore'

function getStyle(active) {
  return {
    color: active ? 'white' : 'black',
    fontWeight: active ? 'bold' : 'normal'
  }
}

const VoteButton = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  toggle() {
    if (LoginStore.isLoggedIn() && PollStore.canVote()) {
      ReactDOM.findDOMNode(this.refs.yes).blur()
      ReactDOM.findDOMNode(this.refs.no).blur()
      this.props.onClick(this.props.active ? 0 : 1)
    }
  },
  render() {
    const disabled = !(LoginStore.isLoggedIn() && PollStore.canVote())
    const active = this.props.active
    const style1 = getStyle(active)
    const style2 = getStyle(!active)
    const bsStyle1 = active ? 'primary' : 'default'
    const bsStyle2 = active ? 'default' : 'danger'

    return (
        <ButtonGroup onClick={this.toggle}>
          <Button disabled={disabled} bsSize="small" ref="yes" style={style1} bsStyle={bsStyle1} active={active ? true : false}>Yes</Button>
          <Button disabled={disabled} bsSize="small" ref="no" style={style2} bsStyle={bsStyle2} active={active ? false : true}>No</Button>
        </ButtonGroup>
    )
  }
})

export default VoteButton
