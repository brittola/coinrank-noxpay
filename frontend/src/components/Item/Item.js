import './Item.css'
import upvote from '../../assets/img/upvote.png'
import upvoteActive from '../../assets/img/upvote_active.png'

function Item({...props}) {

	return (
		<div className="Item">
			<div className="infos">
				<img src={props.info.iconUrl} alt={props.info.name + ' logo'} />
				<span>{props.info.name}</span>
			</div>
			<div
				className={props.info.voted ? 'upvotes voted' : 'upvotes'}
				onClick={() => {
					if (!props.info.voted) {
						props.upvote(props.info)
					}
				}}
			>
				<img src={props.info.voted ? upvoteActive : upvote} alt="Seta para cima de votação" />
				<span>{props.info.upvotes}</span>
			</div>
		</div>
	)

}

export default Item