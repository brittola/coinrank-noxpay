import './CoinsList.css'
import Item from '../Item/Item'

function CoinsList({...props}) {

	return (
		<div className="CoinsList">
			{
				props.items.length > 0 &&
					props.items.map((item, index) => (
						<Item key={index} info={item} upvote={props.upvote} />
					))
			}
			{	// busca por nome inválido
				(props.items.length === 0 && !props.error && !props.loading) &&
					<p>Nenhum resultado encontrado.</p>
			}
			{	// erro ao carregar dados
				(props.items.length === 0 && props.error && !props.loading) &&
					<p>{props.error}</p>
			}
			{	// dados ainda não carregados
				(props.items.length === 0 && !props.error && props.loading) &&
					<p>Carregando...</p>
			}
		</div>
	)
}

export default CoinsList