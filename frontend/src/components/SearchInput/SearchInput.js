import './SearchInput.css'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function SearchInput({...props}) {
	const {search, handleSearchChange} = props;

	return (
		<div className="SearchInput">
			<input
				type="text"
				placeholder="Pesquise por nome"
				value={search}
				onChange={handleSearchChange}
			/>
			<FontAwesomeIcon icon={faMagnifyingGlass} />
		</div>
	)
}

export default SearchInput