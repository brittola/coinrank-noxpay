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
			{
				props.items.length === 0 &&
					<p>Nenhum resultado encontrado.</p>
			}
		</div>
	)
}

export default CoinsList