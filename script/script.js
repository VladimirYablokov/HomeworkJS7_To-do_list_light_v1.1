const formElem = document.forms[0];
const titleElem = formElem.title;
const markElem = formElem.markup;
const cardsElem = document.querySelector('.cards');

const read = () => JSON.parse(localStorage.getItem('cards')) || [];
const write = data => localStorage.setItem('cards', JSON.stringify(data));
const cards = []

const resuldDoneElem = document.querySelector('#done');
let done = localStorage.getItem('valueOfDone') || 0;
resuldDoneElem.innerText = done;

const resuldCancelElem = document.querySelector('#canceled');
let canceled = localStorage.getItem('valueOfCancel') || 0;
resuldCancelElem.innerText = canceled;

formElem.addEventListener('submit', event => {
	event.preventDefault();
	cards.push({
		title: titleElem.value,
		markup: markElem.value
	});
	redner();
});

function redner() {
	if (titleElem.value && markElem.value != ''){
		const card = document.createElement('div');
		const cardTitleElem = document.createElement('div');
		const cardTitleH2Elem = document.createElement('h2');
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

		cardTitleH2Elem.innerText = titleElem.value;
		cardMarkupH2Elem.innerText = markElem.value;
		write(cards);

		acceptBtnElem.innerText = '✔️';
		cancelBtnElem.innerText = '❌';
		titleElem.value = '';
		markElem.value = '';

		acceptBtnElem.addEventListener('click', (event) => {
			resuldDoneElem.innerText = ++done;
			localStorage.setItem('valueOfDone', done);
			card.remove();
		});
		cancelBtnElem.addEventListener('click', (event) => {
			resuldCancelElem.innerText = ++canceled;
			localStorage.setItem('valueOfCancel', canceled);
			card.remove();
		});
	}else{
		alert('Заполните все поля ввода');
	};
};