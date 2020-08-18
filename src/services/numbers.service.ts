class NumbersService {
  private static BASE_URLS: {
    statistics: string;
    countries: string;
  } = {
    statistics: 'https://pomber.github.io/covid19/timeseries.json',
    countries: 'https://restcountries.eu/rest/v2/'
  }
  // ---------
  static async getAllStatistics () {
    const res = await window.axios.get(this.BASE_URLS.statistics)
    return res?.data || null
  }
}

export default NumbersService