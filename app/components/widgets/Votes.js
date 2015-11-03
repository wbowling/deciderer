import React from 'react'
import Chart from './Chart'
import _ from 'lodash'
import debug from '../../constants/debug'

const Votes = React.createClass({
  render() {
    let data = this.props.placesVotes.map(p => { return { value: p.votes, label: p.place } })

    const limited = _.take(_.filter(this.props.placesVotes, x => x.votes > 0), 3)

    const max = _.max(limited, 'votes')
    const min = _.min(limited, 'votes')

    const counts = limited.map((p, i) => {
      const key = p.place
      let size = 22
      if (p.votes === max.votes) {
        size = 28
      } else if (p.votes === min.votes) {
        size = 14
      }
      const inn = `${i + 1}. ${p.place}`
      return <h4 style={{ fontSize: size }} key={inn + key}>{inn}</h4>
    })
    debug.log(data)
    data = _.filter(data, x => x.value > 0)
    return (
        <div>
          {counts}
        <Chart data={data} />
      </div>
    )
  }
})

export default Votes
