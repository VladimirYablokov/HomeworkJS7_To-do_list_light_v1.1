const formElem = document.forms[0];
const titleElem = formElem.title;
const markElem = formElem.markup;
const cardsElem = document.querySelector('.cards');

let myCards = JSON.parse(localStorage.getItem("cards") ?? "[]");

const resultDoneElem = document.querySelector('#done');
let done = myCards.filter(card => card.done).length;
resultDoneElem.innerText = done;

const resuldCancelElem = document.querySelector('#canceled');
let canceled = myCards.filter(card => card.canceled).length;
resuldCancelElem.innerText = canceled;

render();

formElem.addEventListener('submit', event => {
	event.preventDefault();
	if (titleElem.value === "") {
		return;
	}
	myCards.push({
		title: titleElem.value,
		markup: markElem.value,
		done: false,
		canceled: false,
	});
	localStorage.setItem('cards', JSON.stringify(myCards));
	render();
});

function render() {
	titleElem.value = '';
	markElem.value = '';
	cardsElem.innerText = '';
	for (let i = 0; i < myCards.length; i++) {
		if (myCards[i].done || myCards[i].canceled) {
			continue;
		}
		const card = document.createElement('div');
		const cardTitleH2Elem = document.createElement('h2');
		const cardTitleElem = document.createElement('div');
		const cardMarkupH2Elem = document.createElement('h2');
		const acceptBtnElem = document.createElement('div');
		const cancelBtnElem = document.createElement('div');

		cardsElem.append(card);
		card.append(cardTitleElem, acceptBtnElem, cancelBtnElem);
		cardTitleElem.append(cardTitleH2Elem, cardMarkupH2Elem);

		card.classList.add('card');
		cardTitleElem.classList.add('cardTitle');
		acceptBtnElem.classList.add('acceptBtn');
		cancelBtnElem.classList.add('cancelBtn');

		cardTitleH2Elem.innerText = myCards[i].title;
		cardMarkupH2Elem.innerText = myCards[i].markup;
		acceptBtnElem.innerText = '✔️';
		cancelBtnElem.innerText = '❌';

		acceptBtnElem.addEventListener('click', () => {
			resultDoneElem.innerText = ++done;
			myCards[i].done = true;
			localStorage.setItem("cards", JSON.stringify(myCards));
			card.remove();
		});
		cancelBtnElem.addEventListener('click', () => {
			resuldCancelElem.innerText = ++canceled;
			myCards[i].canceled = true;
			localStorage.setItem("cards", JSON.stringify(myCards));
			card.remove();
		});
	}
}