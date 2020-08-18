type CoronaDay = {
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

type CoronaCountry = CoronaDay[]

type CoronaCountries = {
  [key: string]: CoronaCountry
}

// ------------------------------------------

type Country = {
  name: string;
  population: number;
  flag: string;
}

type Countries = Country[]

// ------------------------------------------
type FormattedCountry = {
  data: Country;
  stats: CoronaCountry;
}

type FormattedCountries = {
  [key: string]: FormattedCountry
}

class NumbersService {
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

  static getAll (): FormattedCountries {
    return this.formattedCountries
  }
  static getCountry (name: string): FormattedCountry | null {
    return this.formattedCountries[name.toLowerCase()] || null
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
  }

}

export default NumbersService
