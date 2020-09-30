import React from 'react'
import { CountryDay } from '../../services/data.service'

function Header(props: { data: CountryDay | null }) {
  return (
    <header className="bg-purple-500 p-4">
      {props.data?.data?.name || 'Corona Magnitude'}
    </header>
  )
}

export default Header
