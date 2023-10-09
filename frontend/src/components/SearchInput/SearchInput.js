import './SearchInput.css'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function SearchInput({...props}) {
	return (
		<div className="SearchInput">
			<input
				type="text"
				placeholder="Pesquise por nome"
				value={props.search}
				onChange={props.handleSearchChange}
			/>
			<FontAwesomeIcon icon={faMagnifyingGlass} />
		</div>
	)
}

export default SearchInput