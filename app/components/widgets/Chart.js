import React from 'react'
import { Pie } from 'react-chartjs'
import randomcolor from 'randomcolor'


function createColour(num) {
  return randomcolor({ count: num })
}


function genData(data) {
  const cols = createColour(data.length)
  return data.map((val, i) => {return { value: val.value, label: val.label, color: cols[i] } })
}

const Chart = React.createClass({

  render() {
    let chart
    if (this.props.data && this.props.data.length > 0) {
      const chartData = genData(this.props.data)
      chart = <Pie data={chartData} redraw />
    } else {
      chart = <div />
    }
    return (
      <div>
        {chart}
      </div>
    )
  }
})

export default Chart
