window.nextSlide = () => {
	const activeSlide = document.querySelector('.slide.active');

	if (activeSlide.nextElementSibling && activeSlide.nextElementSibling.classList.contains('slide')) {
		activeSlide.classList.remove('active');
		activeSlide.nextElementSibling.classList.add('active');
	}
};

window.prevSlide = () => {
	const activeSlide = document.querySelector('.slide.active');

	if (activeSlide.previousElementSibling) {
		activeSlide.classList.remove('active');
		activeSlide.previousElementSibling.classList.add('active');
	}
};

document.querySelectorAll('.slide').forEach(slide => {
	slide.addEventListener('click', () => {
		nextSlide();
	});
});

document.addEventListener('keydown', (e) => {
	if(e.key === 'ArrowRight') {
		nextSlide();
	}
	if(e.key === 'ArrowLeft') {
		prevSlide();
	}
});


const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('');

window.addWinner = (arrayCodes, containerId, randomTime = 2000, intervalTime = 2000) => {
	const [code, nameAndTel] = arrayCodes[0];
	const container = document.querySelector(containerId);
	const items = container.querySelectorAll('.final__code-item');

	const intervals = [];

	items.forEach(item => {
		intervals.push(setInterval(() => {
			item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
		}, 100));
	});

	setTimeout(() => {
		const symbols = code.split('');
		intervals.forEach((interval, index) => {
			clearInterval(interval);
		});
		items.forEach((item, index) => {
			item.innerHTML = symbols[index];
		});
		const winnerTitle = container.querySelector('.final-last-winner');
		if (winnerTitle) {
			winnerTitle.textContent = nameAndTel;
		}

		const winnersList = container.querySelector('.winners__list');
		if (winnersList) {
			const winner = document.createElement('div');
			winner.classList.add('winner');
			winner.textContent = nameAndTel;
			winnersList.appendChild(winner);
			scrollBlock(containerId);
		}
	}, randomTime);

	setTimeout(() => {
		const newArray = arrayCodes.slice(1);

		if (newArray.length > 0) {
			addWinner(newArray, containerId, randomTime, intervalTime);
		}
	}, randomTime + intervalTime);
};


function scrollBlock(containerId) {
	const container = document.querySelector(containerId);
	const winnerList = container.querySelector('.winners__list');
	winnerList.scrollTo(0, winnerList.scrollHeight);
}