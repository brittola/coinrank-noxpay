import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header/Header';
import CoinsList from './components/CoinsList/CoinsList';
import SearchInput from './components/SearchInput/SearchInput';

function App() {

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [items, setItems] = useState([]);

	const [search, setSearch] = useState('');

	const upvote = (coin) => {

		// verifica se o item já estava votado
		const i = items.findIndex(item => item.id === coin.id);
		let upvotes = 0;

		if (items[i].voted) {
			upvotes = -1;
		} else {
			upvotes = 1;
		}

		const reqBody = JSON.stringify({ id: coin.id, upvotes })

		// salva em banco de dados e atualiza o state
		fetch(`http://localhost:8080/coins`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: reqBody,
		})
			.then(res => res.json())
			.then(data => {
				const updatedItems = [...items];

				updatedItems[i] = {
					...updatedItems[i],
					upvotes: data.upvotes,
					voted: !updatedItems[i].voted,
				};

				setItems(updatedItems);
			})
			.catch(err => {
				console.log('Erro na requisição:', err);
			});
	}

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	// inicializa lista de moedas
	useEffect(() => {
		fetch('http://localhost:8080/coins')
			.then(res => res.json())
			.then(json => {
				setLoading(false);

				const data = json;

				// buscar votos salvos em localStorage
				if (localStorage.getItem('coins_voted')) {
					const voted = JSON.parse(localStorage.getItem('coins_voted'));

					const updatedItems = data.map(item => ({
						...item,
						voted: voted.includes(item.name)
					}));

					setItems(updatedItems);
				} else {
					const updatedItems = data.map(item => ({
						...item,
						voted: false
					}));

					setItems(updatedItems);
				}

			})
			.catch(err => {
				console.log(err)
				setError('Erro ao receber dados')
			})
	}, [])

	// salva os votos em localStorage
	useEffect(() => {
		if (localStorage.getItem('coins_voted')) {
			let coins_voted = JSON.parse(localStorage.getItem('coins_voted'));

			items.forEach(item => {
				if (item.voted && !coins_voted.includes(item.name)) {
					coins_voted.push(item.name);
				}

				// se o voto foi removido, remove do array salvo em localStorage
				if (!item.voted) {
					coins_voted = coins_voted.filter(coin => coin !== item.name);
				}
			});

			localStorage.setItem('coins_voted', JSON.stringify(coins_voted));
		} else {
			const coins_voted = items
				.filter(item => item.voted)
				.map(item => item.name);

			localStorage.setItem('coins_voted', JSON.stringify(coins_voted));
		}
	}, [items])

	// filtro da busca + ordenação por upvotes/popularidade
	const filteredItems = items.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase())
	).sort((a, b) => b.upvotes - a.upvotes);

	return (
		<div className="App">
			<Header />
			<p>Quais das moedas abaixo você conhece?</p>
			<SearchInput search={search} handleSearchChange={handleSearchChange} />
			<CoinsList items={filteredItems} upvote={upvote} loading={loading} error={error} />
		</div>
	);
}

export default App;
