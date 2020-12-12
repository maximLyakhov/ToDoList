document.addEventListener('DOMContentLoaded', renderArray);

let addToDoButton = document.querySelector('.addToDo');
let inputField = document.querySelector('#input');

addToDoButton.addEventListener('click', addToDo);
addToDoButton.addEventListener('click', inputFieldClearing);

inputField.addEventListener('keypress', enterino => {
	if (enterino.key === 'Enter') {
		addToDo();
		inputFieldClearing();
		};
	}
);

var container = new Array;
var deletedItemsContainer = new Array;

function addToDo() {
	let toDoValue = document.querySelector('input').value;
	let list = document.querySelector('.list');
	let li = document.createElement('li');
	let date = Date.now();
	let uniqueToDo = {
		time: date,
		text: toDoValue,
	};

	if (toDoValue.length !== 0)
	{
		list.appendChild(li).innerHTML = toDoValue;
		list.appendChild(li).setAttribute = uniqueToDo.time;

		let doneToDo = document.createElement('button');
		li.appendChild(doneToDo).className = `done ${li.className}`;
		doneToDo.innerHTML = '✔︎';
		doneToDo.addEventListener('click', doneToDoFnn);

		let deleteToDo = document.createElement('button');
		li.appendChild(deleteToDo).className = `deleted ${li.className}`;
		deleteToDo.innerHTML = 'X';
		deleteToDo.addEventListener('click', deleteToDoFnn);

		container.push(uniqueToDo);
		localStorage.setItem('toDoStorage', JSON.stringify(container));
	};
};

function inputFieldClearing() {
	inputField.value = '';
};

function renderArray() {
	container = JSON.parse(localStorage.getItem('toDoStorage') || "[]");
	deletedItemsContainer = JSON.parse(localStorage.getItem('deletedToDoStorage') || "[]");
	for (let val of container) {
		let text = val.text;
		let time = val.time;

		let list = document.querySelector('.list');
		let li = document.createElement('li');

		list.appendChild(li).innerHTML = text;
		list.appendChild(li).className = 'todo';
		list.appendChild(li).setAttribute('id', time);

		let doneToDo = document.createElement('button');
		li.appendChild(doneToDo);
		doneToDo.innerHTML = 'Done!';
		doneToDo.addEventListener('click', doneToDoFnn);

		let deleteToDo = document.createElement('button');
		li.appendChild(deleteToDo);
		deleteToDo.innerHTML = 'Delete!';
		deleteToDo.addEventListener('click', deleteToDoFnn);
	};
};

function doneToDoFnn() {
	let currentItem = this.closest('li');
	currentItem.classList.toggle('todo');
	currentItem.classList.toggle('alreadydone');
};

function deleteToDoFnn() {
	let currentItem = this.closest('li');
	let currentItemId = this.parentNode.id;
	console.log(currentItemId);
	for(let val of container) {
		if (val.time == currentItemId){
			container = container.filter(item => item.time != currentItemId);
			console.table(container);
			deletedItemsContainer.push(val);
			console.table(deletedItemsContainer);
		}
	}
	localStorage.setItem('deletedToDoStorage', JSON.stringify(deletedItemsContainer));
	currentItem.remove();
};

/* === pseudocode

draw page from the array or provide functional page without array	+
add todo must be on enter keypress or button click	+
adding of todo draws li item +
and removes text from input +
li item must be with buttons 'done'	+

'delete' which have their id's as well as	+
saves input into array, which nests in localstorage	+

edit button switches todo li into the input field and waits for changes to be completed

delete button moves todo instance into 'deleted' folder and separate array +
delete removes parent +

edit button creates input and edits this li
or
passes the value of  li to the input field and then changes it and clears input

done button strike through text in li + */