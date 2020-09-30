import React from 'react'
import { CountryDay } from '../../services/data.service'
import '../../styles/Grid.scss'

type IProps = {
  data: CountryDay | null
}

class Grid extends React.Component<IProps> {
  cellValue = 100000
  cellAmount = 0
  rowAmount = 0
  // times = (length: number = 1) => new Array(length)
  times = (length: number = 1) => (Array.apply as (thisarg: null, algo: { length: number }) => any[])(null, { length })
  // constructor(props: IProps) {
  //   super(props)
  // }

  componentWillUpdate(nextProps: IProps) {
    this.setCtrl(nextProps)
  }

  setCtrl(props: IProps) {
    const pop = props.data?.stats?.population || 0
    // const deaths = props.data?.stats?.deaths || 0
    this.cellAmount = Math.floor(pop / this.cellValue)
    this.rowAmount = Math.sqrt(this.cellAmount)
  }

  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid-container">
          {
            this.times(this.rowAmount).map(() => (
              <div className="row flex">
                {this.times(this.rowAmount).map((e, i) => (
                  <div className="cell" key={i}>
                    {/* cell */}
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Grid
