import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header/Header';
import CoinsList from './components/CoinsList/CoinsList';
import SearchInput from './components/SearchInput/SearchInput';

function App() {

	const [items, setItems] = useState([]);

	const [search, setSearch] = useState('');

	const upvote = (coin) => {

		items.forEach(item => {
			// permite apenas um voto
			if (item.name === coin.name && !item.voted) {
				item.voted = true
				item.upvotes++
				
				if (localStorage.getItem('coins_voted')) {
					console.log('ja tinha em storage')
					const voted = JSON.parse(localStorage.getItem('coins_voted'));
					voted.push(item.name);
					localStorage.setItem('coins_voted', JSON.stringify(voted));
				} else {
					const voted = [item.name];
					localStorage.setItem('coins_voted', JSON.stringify(voted));
				}
			}
		})

		setItems([...items])
	}

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	// buscar votos salvos em localStorage
	useEffect(() => {
		fetch('http://localhost:8080/coins')
			.then(res => res.json())
			.then(data => {
				setItems(data);
			})
			.catch(err => {
				console.log(err)
			})

		if (localStorage.getItem('coins_voted')) {
			const voted = JSON.parse(localStorage.getItem('coins_voted'));
			
			const updatedItems = items.map(item => ({
				...item,
				voted: voted.includes(item.name)
			}));

			setItems(updatedItems);
		}
	}, [])

	const filteredItems = items.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase())
	);

	filteredItems.sort((a, b) => b.upvotes - a.upvotes);

	return (
		<div className="App">
			<Header />
			<p>Quais das moedas abaixo você conhece?</p>
			<SearchInput search={search} handleSearchChange={handleSearchChange} />
			<CoinsList items={filteredItems} upvote={upvote} />
		</div>
	);
}

export default App;
