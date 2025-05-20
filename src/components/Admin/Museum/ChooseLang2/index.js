import React from 'react'

const index = ({router, pathname, searchParams}) => {
  return (
    <div>
      <label htmlFor='chooseLang' className='mb-2'>Choose Upload Language</label>
      <select
        className='block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        name='language'
        defaultValue={searchParams.get('lang')}
        onChange={(e) => router.push(`${pathname}?lang=${e.target.value}&exhibitId=${searchParams.get('exhibitId')}&museumId=${searchParams.get('museumId')}`)}
        id='lang'
      >
        <option value='en'>EN</option>
        <option value='az'>AZ</option>
        <option value='ru'>RU</option>
        <option value='ko'>KO</option>
        <option value='ar'>AR</option>
      </select>
    </div>
  )
}

export default index
