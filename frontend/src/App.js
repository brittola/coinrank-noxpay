import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header/Header';
import CoinsList from './components/CoinsList/CoinsList';
import SearchInput from './components/SearchInput/SearchInput';

function App() {

	const [items, setItems] = useState([
		{
			name: 'Bitcoin',
			upvotes: 123,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
			voted: false
		},
		{
			name: 'Ethereum',
			upvotes: 87,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
			voted: false
		},
		{
			name: 'Avalanche',
			upvotes: 54,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
			voted: false
		},
		{
			name: 'Axie Infinity',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png',
			voted: false
		},
		{
			name: 'Tether Gold',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5176.png',
			voted: false
		},
		{
			name: 'Chainlink',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
			voted: false
		},
		{
			name: 'NEAR Protocol',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png',
			voted: false
		},
		{
			name: 'Pepe',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png',
			voted: false
		},
		{
			name: 'Tezos',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png',
			voted: false
		},
		{
			name: 'Optimism',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png',
			voted: false
		},
		{
			name: 'BNB',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
			voted: false
		},
		{
			name: 'Polygon',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
			voted: false
		},
		{
			name: 'Cosmos',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png',
			voted: false
		},
		{
			name: 'Neo',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1376.png',
			voted: false
		},
		{
			name: 'Solana',
			upvotes: 40,
			iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
			voted: false
		},
	]);

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
		if (localStorage.getItem('coins_voted')) {
			const voted = JSON.parse(localStorage.getItem('coins_voted'));
			
			const updatedItems = items.map(item => ({
				...item,
				voted: voted.includes(item.name)
			}));

			setItems(updatedItems);
		}
	}, [items])

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
