import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          if(searchQuery) {
          navigate(`/search/${searchQuery}`)
          setSearchQuery('')
          }
        }}
        sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            mr:{sm:5}
        }}
    >
        <input className='search-bar' placeholder='Search...' value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} />
        <IconButton type="submit" sx={{ p: '10px', color:'red' }}>
            <Search />
        </IconButton>
    </Paper>
  )
}

export default SearchBar