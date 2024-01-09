import { useEffect, useState } from 'react';

const images = [
	{ id: 'blush', src: 'public/assets/images/blush.png' },
	{ id: 'uelz', src: 'public/assets/images/uelz.png' },
	{ id: 'nomefio', src: 'public/assets/images/nomefio.png' },
	{ id: 'incognito', src: 'public/assets/images/incognito.png' },
	{ id: 'lovely', src: 'public/assets/images/lovely.png' },
	{
		id: 'llorandoporlaprueba',
		src: 'public/assets/images/llorandoporlaprueba.png',
	},
	{ id: 'alvaro', src: 'public/assets/images/alvaro.png' },
	{ id: 'melapaso', src: 'public/assets/images/melapaso.png' },
	{ id: 'cowboy', src: 'public/assets/images/cowboy.png' },
];

const cards = [...images, ...images];
const shuffledCards = cards.sort(() => Math.random() - 0.5);

const map = new Map([
	['blush', 'blush'],
	['uelz', 'uelz'],
	['nomefio', 'nomefio'],
	['incognito', 'incognito'],
	['lovely', 'lovely'],
	['llorandoporlaprueba', 'llorandoporlaprueba'],
	['alvaro', 'alvaro'],
	['melapaso', 'melapaso'],
	['cowboy', 'cowboy'],
]);

function App() {
	const [startTime, _setStartTime] = useState<number>(new Date().getTime());
	const [endTime, setEndTime] = useState<number>(0);
	const [selectedCards, setSelectedCards] = useState<Array<number>>([]);
	const [matchedCards, setMatchedCards] = useState<Array<number>>([]);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		if (selectedCards.length === 2) {
			const [firstCard, secondCard] = selectedCards;
			const firstCardImage = shuffledCards[firstCard - 1];
			const secondCardImage = shuffledCards[secondCard - 1];
			const firstCardImageId = map.get(firstCardImage.id);
			const secondCardImageId = map.get(secondCardImage.id);

			if (firstCardImageId === secondCardImageId) {
				setMatchedCards([...matchedCards, firstCard, secondCard]);
				setSelectedCards([]);
			} else {
				setTimeout(() => {
					setSelectedCards([]);
				}, 1000);
			}
		}
	}, [selectedCards]);

	useEffect(() => {
		if (matchedCards.length === 18) {
			const endTime = new Date().getTime();
			const time = endTime - startTime;
			setEndTime(time);

			setShowModal(true);
		}
	}, [matchedCards]);

	function selectCard(card: number) {
		setSelectedCards([...selectedCards, card]);
	}

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					display: 'grid',
					gridTemplateRows: 'repeat(3, 1fr)',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gap: 14,
					opacity: showModal ? 0.5 : 1,
				}}
			>
				{shuffledCards.map((image, index) => {
					if (matchedCards.includes(index + 1)) {
						return (
							<img
								key={index}
								src={image.src}
								alt={image.id}
								style={{ width: 128, height: 128 }}
							/>
						);
					}

					if (selectedCards.includes(index + 1)) {
						return (
							<img
								key={index}
								src={image.src}
								alt={image.id}
								style={{ width: 128, height: 128 }}
							/>
						);
					}

					return (
						<img
							style={{
								width: 128,
								height: 128,
								pointerEvents: selectedCards.length === 2 ? 'none' : 'auto',
							}}
							key={index}
							onClick={() => selectCard(index + 1)}
							src={`public/assets/images/${index + 1}.png`}
							alt={image.id}
						/>
					);
				})}
			</div>
			{showModal && <Modal time={endTime} />}
		</div>
	);
}

function Modal({ time }: { time: number }) {
	const hours = Math.floor(time / 3600000);
	const minutes = Math.floor((time - hours * 3600000) / 60000);
	const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);

	const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
	const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

	let timeString = `${hoursString}:${minutesString}:${secondsString}`;

	if (hours === 0) {
		timeString = `${minutesString}:${secondsString}`;
	}

	if (hours === 0 && minutes === 0) {
		timeString = `00:${secondsString}`;
	}

	return (
		<div
			style={{
				position: 'absolute',
				backgroundColor: 'white',
				borderRadius: 8,
				width: 484,
				height: 212,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1
				style={{
					color: '#173371',
					fontSize: 20,
					fontWeight: 600,
					marginBottom: 24,
				}}
			>
				¡Lo has conseguido!
			</h1>
			<div
				style={{ height: 60, display: 'flex', alignItems: 'center', gap: 8 }}
			>
				<img
					src="public/assets/images/Clock.png"
					alt="clock"
					style={{ width: 40, height: 40 }}
				/>
				<span
					style={{
						color: '#173371',
						fontSize: 60,
						fontWeight: 600,
						lineHeight: 60,
					}}
				>
					{timeString}
				</span>
			</div>
			<button
				onClick={() => window.location.reload()}
				style={{
					height: 52,
					padding: '24 12',
					background: '#38D4AD',
					display: 'flex',
					alignItems: 'center',
					marginTop: 'auto',
					marginBottom: 12,
				}}
			>
				Jugar otra vez
			</button>
		</div>
	);
}

export default App;
