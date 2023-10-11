import './CoinsList.css'
import Item from '../Item/Item'

function CoinsList({...props}) {

	const {items, error, loading, upvote} = props;

	return (
		<div className="CoinsList">
			{
				items.length > 0 &&
					items.map((item, index) => (
						<Item key={index} info={item} upvote={upvote} />
					))
			}
			{	// busca por nome inválido
				(items.length === 0 && !error && !loading) &&
					<p>Nenhum resultado encontrado.</p>
			}
			{	// erro ao carregar dados
				(items.length === 0 && error && !loading) &&
					<p>{error}</p>
			}
			{	// dados ainda não carregados
				(items.length === 0 && !error && loading) &&
					<p>Carregando...</p>
			}
		</div>
	)
}

export default CoinsList