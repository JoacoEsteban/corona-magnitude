import React, { ChangeEvent } from 'react'
import { CountryDay, FormattedCountries, FormattedCountry } from '../../services/data.service'

function Header(props: { data: CountryDay | null, list: FormattedCountries | null, setCountry: (country: string) => Promise<void> }) {
  const _onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }
  return (
    <header className="bg-purple-500 p-4">
      <div className="cm-container">
        <h1>
          <span>
            {props.data?.data?.name || 'Corona Magnitude'}
          </span>
        </h1>
        {
          props.list && props.data ?
            <select name="country" id="country-selector" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => props.setCountry(e.target.value)} defaultValue={props.data?.data?.normalizedKey}>
              {Object.keys(props.list).map(key => (
                <option value={key} key={key}>
                  {props.list![key].data.name}
                </option>
              ))}
            </select>
            : null
        }
      </div>
    </header>
  )
}

export default Header
