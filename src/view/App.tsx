import React, { useState } from 'react'
import '../styles/App.scss'
import Header from './components/Header'
import Grid from './layouts/Grid'

import NumbersService, { CountryDay } from '../services/data.service'


interface IProps {
}

interface IState {
  numbers: CountryDay | null
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { numbers: null }
  }
  async componentDidMount() {
    // const [numbers, setNumbers] = useState<CountryDay | null>(null)
    await NumbersService.setup()
    this.setState({ numbers: await NumbersService.getCountryStats('us') })
    console.log(this.state.numbers)
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.numbers} />
        <Grid data={this.state.numbers} />
      </div>
    )
  }
}

export default App
