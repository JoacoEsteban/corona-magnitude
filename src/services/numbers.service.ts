import _ from 'lodash'

export type CoronaDay = {
  date: Date;
  confirmed: number;
  deaths: number;
  recovered: number;
  ptg: {
    confirmed: number;
    deaths: number;
    recovered: number;
  }
}

export type CoronaCountry = CoronaDay[]

export type CoronaCountries = {
  [key: string]: CoronaCountry
}

// ------------------------------------------

export type Country = {
  name: string;
  population: number;
  flag: string;
}

export type Countries = Country[]

// ------------------------------------------
export type FormattedCountry = {
  data: Country;
  stats: CoronaCountry;
}

export type FormattedCountries = {
  [key: string]: FormattedCountry
}

export type CountryDay = {
  data: Country;
  stats: CoronaDay;
}

class NumbersService {
  private static queries = []
  private static mounted = false

  private static statistics: CoronaCountries
  private static countries: Countries
  private static formattedCountries: FormattedCountries

  private static BASE_URLS: {
    statistics: string;
    countries: string;
  } = {
    statistics: 'https://pomber.github.io/covid19/timeseries.json',
    countries: 'https://restcountries.eu/rest/v2/'
  }
  // ---------
  private static async getAllStatistics (): Promise<CoronaCountries | null> {
    return (await window.axios.get(this.BASE_URLS.statistics))?.data || null
  }
  private static async getAllCountries (): Promise<Countries | null>  {
    return (await window.axios.get(this.BASE_URLS.countries))?.data || null
  }


  static clearRemainingQueries (): void {
    while (this.queries.length) this.queries.splice(0, 1)[0]()
  }


  static getAll (): Promise<FormattedCountries> {
    return new Promise(resolve => {
      const fn = () => resolve(this.formattedCountries)
      if (!this.mounted) this.queries.push(fn)
      else fn()
    })
  }
  static getCountry (name: string, date?: Date): FormattedCountry | null {
    return this.formattedCountries[name.toLowerCase()] || null
  }

  static async getCountryStats (name: string, date?: Date): Promise<CountryDay | null> {
    return new Promise(resolve => {
      const value = () => {
        const country = this.getCountry(name)

        return country && {
          data: country.data,
          stats: date ? country.stats.find(day => day.date === date) : _.last(country.stats)
        }
      }
      const fn = () => resolve(value())

      if (!this.mounted) this.queries.push(fn)
      else fn()
    })
  }

  private static formatNumbers () {
    for (const name in this.formattedCountries) {
      const country = this.formattedCountries[name]
      const population = country.data.population
      country.stats.forEach(stat => {
        stat.ptg = {
          confirmed: stat.confirmed / population,
          deaths: stat.deaths / population,
          recovered: stat.recovered / population
        }
      });
    }
  }

  static async setup () {
    const statistics = await this.getAllStatistics()
    const countries = await this.getAllCountries()

    const mixed = {}

    for (const name in statistics) {
      const _name = name.toLowerCase().replace(/ |\*/g, '')
      const country = countries.find(c => c.name.toLowerCase().replace(/ /g, '').includes(_name))
      country && (mixed[name.toLowerCase()] = {
        stats: statistics[name],
        data: country
      })
    }
    
    this.formattedCountries = mixed
    this.formatNumbers()
    this.mounted = true
    this.clearRemainingQueries()
  }

}

export default NumbersService
