import React, { useState } from 'react'
import '../styles/App.scss'
import Header from './components/Header'
import Grid from './layouts/Grid'

import NumbersService, { Countries, CountryDay, FormattedCountries } from '../services/data.service'


interface IProps {
}

interface IState {
  numbers: CountryDay | null
  countries: FormattedCountries | null
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { numbers: null, countries: null }
  }
  async componentDidMount() {
    // const [numbers, setNumbers] = useState<CountryDay | null>(null)
    await NumbersService.setup()
    this.setState({ countries: (await NumbersService.getAll()) || null })
    await this.setCountry('us')
    console.log(this.state.countries, this.state)
  }

  async setCountry(country: string): Promise<void> {
    this.setState({ numbers: await NumbersService.getCountryStats(country) })
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.numbers} list={this.state.countries} setCountry={this.setCountry.bind(this)} />
        <Grid data={this.state.numbers} />
      </div>
    )
  }
}

export default App
