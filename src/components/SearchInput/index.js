import './styles.css'

export const SearchInput = ({ handleChange, searchValue }) => (
    <input
        className='search-input'
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder='Type your search'
    />
)