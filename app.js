document.addEventListener('DOMContentLoaded', renderArray);

document.querySelector('.addToDo').addEventListener('click', addToDo);
let clearInput = document.querySelector('.addToDo');
let inputEd = document.querySelectorAll('input');
clearInput.addEventListener('click', () => {
	inputEd.forEach(input => input.value = '');
});

// document.querySelector('input').addEventListener('keypress',  (enterino) => {if (enterino.key === 'Enter') addToDo();});
// clearInput.addEventListener('keypress',  (entered) => {
// 	if (entered.key === 'Enter'){
// 		inputEd.forEach(input => input.value = '');
// 	};
// });

var container = new Array;

function addToDo (){
	let toDoValue = document.querySelector('input').value;
	let list = document.querySelector('.list');
	let li = document.createElement('li');
	let date = Date.now();
	let uniqueToDo = {
		time: date,
		text: toDoValue,
	};
	
	if (toDoValue.length !== 0 ) {
	list.appendChild(li).innerHTML = toDoValue;
	list.appendChild(li).className = `${uniqueToDo.time}`;

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

function renderArray () {
	container = JSON.parse(localStorage.getItem('toDoStorage') || "[]");
	for (let val of container) {
		let list = document.querySelector('.list');
		let li = document.createElement('li');

		list.appendChild(li).innerHTML = val.text;
		list.appendChild(li).className = `${val.time}`;

		let doneToDo = document.createElement('button');
		li.appendChild(doneToDo).className = `done=${li.className}`;
		doneToDo.innerHTML = '✔︎';
		doneToDo.addEventListener('click', doneToDoFnn);
		let deleteToDo = document.createElement('button');
		li.appendChild(deleteToDo).className = `deleted=${li.className}`;
		deleteToDo.innerHTML = 'X';
		deleteToDo.addEventListener('click', deleteToDoFnn);
	};
}; 

function doneToDoFnn () {
	let parElem = this.parentElement;
	const parElemClean = this.parentElement;
	parElem.innerHTML = '<s>' + parElem.innerHTML + '</s>';
	if (parElem.innerHTML == parElemClean.innerHTML) {
		parElem.innerHTML == parElemClean.innerHTML;
	} else {
		parElem.innerHTML == parElemClean.innerHTML
	};
	// let pickedClass = this.className;
	// if(pickedClass.value = 'done'){
	// 	let numericData = pickedClass.replace( /^\D+/g, '');
	// 	let liDonium = liDone[0].childNodes[0];
	// 	liDonium.nodeValue = '<s>' + liDonium.nodeValue + '</s>';
	// 	console.log(liDone);
	// };
};

function deleteToDoFnn () {
	let pickedClass = this.className;
	console.log(pickedClass);
};


// var baton = document.querySelectorAll('[class*="done"]');
// console.log(baton);

/* === pseudocode

draw page from the array or provide functional page without array	+
add todo must be on enter keypress or button click	+
adding of todo draws li item + 
and removes text from input ?
li item must be with buttons 'done'	+
'edit' and	?
'delete' which have their id's as well as	+
saves input into array, which nests in localstorage	+
edit button switches todo li into the input field and waits for changes to be completed
delete button moves todo instance into 'deleted' folder and separate array

*/ 

// if delete button class is number, then delete li with such class // or try to remove parent!
// if edit button class is number, then create input and edit li with such class
// if done button class is number, then strike through text in li with such class