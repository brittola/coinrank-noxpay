import './Item.css'
import upvoteArrow from '../../assets/img/upvote.png'
import upvoteArrowActive from '../../assets/img/upvote_active.png'

function Item({...props}) {

	const {info, upvote} = props;

	return (
		<div className="Item">
			<div className="infos">
				<img src={info.icon_url} alt={info.name + ' logo'} />
				<span>{info.name}</span>
			</div>
			<div
				className="upvotes"
				onClick={() => {
					upvote(info)
				}}
			>
				<img src={info.voted ? upvoteArrowActive : upvoteArrow} alt="Seta para cima de votação" />
				<span>{info.upvotes}</span>
			</div>
		</div>
	)

}

export default Item