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

function addToDo() {
	let toDoValue = document.querySelector('input').value;
	let list = document.querySelector('.list');
	let li = document.createElement('li');
	let date = Date.now();
	let uniqueToDo = {
		time: date,
		text: toDoValue,
		done: false,
		editing: false,
		deleted: false
	};

	if (toDoValue.length !== 0)
	{
		list.appendChild(li).innerHTML = toDoValue;
		list.appendChild(li).setAttribute = uniqueToDo.time;

		let doneToDo = document.createElement('button');
		li.appendChild(doneToDo);
		doneToDo.innerHTML = 'Done!';
		doneToDo.addEventListener('click', doneToDoFnn);

		let editToDo = document.createElement('button');
		li.appendChild(editToDo);
		editToDo.innerHTML = 'Edit';
		editToDo.addEventListener('click', editToDoFnn);

		let deleteToDo = document.createElement('button');
		li.appendChild(deleteToDo);
		deleteToDo.innerHTML = 'Delete!';
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
	for (let val of container) {
		let list = document.querySelector('.list');
		let li = document.createElement('li');
		let text = val.text;
		let time = val.time;
		list.appendChild(li).innerHTML = text;
		list.appendChild(li).className = 'todo';
		list.appendChild(li).setAttribute('id', time);

		let doneToDo = document.createElement('button');
		li.appendChild(doneToDo).className = 'bdone';
		doneToDo.innerHTML = 'Done!';
		doneToDo.addEventListener('click', doneToDoFnn);

		let editToDo = document.createElement('button');
		li.appendChild(editToDo);
		editToDo.innerHTML = 'Edit';
		editToDo.addEventListener('click', editToDoFnn);

		let deleteToDo = document.createElement('button');
		li.appendChild(deleteToDo);
		deleteToDo.innerHTML = 'Delete!';
		deleteToDo.addEventListener('click', deleteToDoFnn);

		let done = val.done;
		if (done = true) {
			list.appendChild(li).classList.toggle('todo');
			list.appendChild(li).classList.toggle('alreadydone');
		}
	};
};

function doneToDoFnn() {
	let currentItem = this.parentNode;

	let currentItemId = this.parentNode.id;
	for (let val of container){
		let time = val.time;
		let done = val.done;
		if (time == currentItemId) {
			done= !done;
		};
	currentItem.classList.toggle('todo');
	currentItem.classList.toggle('alreadydone');
	};
	localStorage.setItem('toDoStorage', JSON.stringify(container));
};

function editToDoFnn () {
	let currentItem = this.parentNode;
	let editToDo = document.createElement('input');
	currentItem.appendChild(editToDo);

}

function editToDoApplyFnn () {

};

function deleteToDoFnn() {
	let currentItem = this.closest('li');
	let currentItemId = this.parentNode.id;
	// если клаcc done, то присвоить значение в эррей

	for(let val of container) {
		if (val.time == currentItemId){
			container = container.filter(item => item.time != currentItemId);
		};
	};
	localStorage.setItem('toDoStorage', JSON.stringify(container));
	currentItem.remove();
};

// let switcher = document.querySelector('.switcher');
// let selectedValue = switcher.options[switcher.selectedIndex].value;
//
// switch (selectedValue) {
// 	case 2:
// 		alert('all good!');
// 		break;
// 	case 3:
// 		alert('in progress!');
// 		break;
// 	case 4:
// 		alert('man, u killin me');
// 		break;
// };

