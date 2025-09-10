// import React, { useState } from 'react'
// import { Input } from './ui/input'
// import { useNavigate } from 'react-router-dom'
// import { RouteSearch } from '@/helpers/RouteName'

// const SearchBox = () => {
//   const navigate = useNavigate()
//   const [query, setQuery] = useState()
//   const getInput = (e) => {
//     setQuery(e.target.value)
//   }
//   const handleSubmit = (e)=> {
//     e.preventDefault()
//     navigate(RouteSearch(query))
//   }
//   return (
//     <form onSubmit={handleSubmit} className='flex items-center'>
//         <Input name='q' onInput={getInput} placeholder='Search... ' 
//         className="h-9 rounded-full bg-gray-50"/>
//     </form>
//   )
// }

// export default SearchBox



import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouteName'
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBox = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState()
  const [isFocused, setIsFocused] = useState(false)

  const getInput = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      navigate(RouteSearch(query))
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      {/* Icon */}
      <BiSearchAlt2 className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500 text-lg" />

      {/* Input */}
      <Input 
        name="q" 
        onInput={getInput}
        placeholder="Search blogs..." 
        className="h-10 pl-10 pr-4 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full"
        value={query}
      />
    </form>
  )
}

export default SearchBox
