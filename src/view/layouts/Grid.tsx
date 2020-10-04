import React from 'react'
import { CountryDay } from '../../services/data.service'
import '../../styles/Grid.scss'
import cx from 'classnames'

type IProps = {
  data: CountryDay | null
}

class Grid extends React.Component<IProps> {
  cellValue = 100000
  cellAmount = 0
  rowAmount = 0
  infectedCellAmount = 0
  infectedCellIndex = 0
  deadCellAmount = 0
  deadCellIndex = 0
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
    const dead = props.data?.stats?.deaths || 0
    const infected = (props.data?.stats?.confirmed || 0) + dead
    // const infected = 1000000

    this.cellAmount = Math.floor(pop / this.cellValue)
    this.rowAmount = Math.sqrt(this.cellAmount)

    this.infectedCellAmount = infected / pop * this.cellAmount
    this.deadCellAmount = dead / pop * this.cellAmount

    this.infectedCellIndex = Math.floor(Math.sqrt(this.infectedCellAmount))
    this.deadCellIndex = Math.floor(Math.sqrt(this.deadCellAmount))

    console.log(this.infectedCellIndex, this.deadCellIndex)
    console.log('\n')
    console.log(this.infectedCellAmount * this.cellValue, infected)
    console.log(this.deadCellAmount * this.cellValue, dead)
  }

  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid-container">
          {
            this.times(this.rowAmount).map((e, rowI) => (
              <div className="row flex" key={rowI}>
                {
                  this.times(this.rowAmount).map((e, cellI) => (
                    <div className={'cell ' + cx({
                      infected: rowI < this.infectedCellIndex && cellI < this.infectedCellIndex,
                      dead: rowI < this.deadCellIndex && cellI < this.deadCellIndex,
                    })} key={cellI}>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Grid
