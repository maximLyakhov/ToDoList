let container = new Array

document.getElementById('switcher').options.selectedIndex = 1

const addToDoButton = document.querySelector('.addToDo')
const inputField = document.querySelector('#input')
const list = document.querySelector('.list')

class TodoCreator {
    constructor(input, id) {
    this.id = id
    this.text = input
    this.done = false
    this.editing = false
    }

    get pushing () {
        container.push(this)
        localStorage.setItem('ooptodo', JSON.stringify(container))
    }
}

class LiCreator {
	constructor(input, id, done, editing) {
            let li = document.createElement('li')
            list.appendChild(li).innerHTML = input
            list.appendChild(li).setAttribute('id', id)
            if (done == true) {
                li.className = 'alreadydone'
            }
            else if (editing == true) {
                new InputFieldCreator(li, id, true)
            }
            new ButtonSet(li, 'Edit', 'Done', 'Delete')
    }
}

class InputFieldCreator {
    constructor(selector, id, boolean) {
        this.id = id
        let inputToDo = document.createElement('input')
        if (boolean == true) {
            selector.appendChild(inputToDo).classList.add(id)
            inputToDo.value = selector.childNodes[0].data
            inputToDo.focus();
            inputToDo.select();
            selector.childNodes[0].data = ''
            new InputFieldHook(selector, id)
        }
        if (boolean == false) {
            for (let i in container) {
                if (container[i].id === parseInt(id)) {
                    selector.childNodes[0].data = container[i].text
                   break
                }
            }
            let elements = document.getElementsByClassName(id)
            while (elements.length > 0) elements[0].remove()
        }
    }
}

class InputFieldHook {
    constructor(selector, id) {
        this.id = id
        let hookedInput = document.getElementById(id).querySelector('input')
        hookedInput.addEventListener('input',  checking)
        hookedInput.addEventListener('keypress', enterino => {
            if (enterino.key === 'Enter') {
                selector.childNodes[0].data = hookedInput.value
                let elements = document.getElementsByClassName(id)
                while (elements.length > 0) elements[0].remove()
            }
        }
        )
        function checking () {
            for (let i in container) {
                if (container[i].id === parseInt(id)) {
                   container[i].text = this.value.trim()
                    if(this.value !== ' ' && this.value.length > 0 && this.value !== null) {
                        localStorage.setItem('ooptodo', JSON.stringify(container))
                    } else {
                        container.splice(i, 1)
                        localStorage.setItem('ooptodo', JSON.stringify(container))
                        document.getElementById(id).remove()
                    }
                    break
                }
            }
        }
    }
}

class ButtonSet {
    constructor(selector, name, name2, name3){
        if (name !== undefined){
            let buttonEdit = document.createElement('button')
            selector.appendChild(buttonEdit).innerHTML = name
            selector.appendChild(buttonEdit).addEventListener('click', editToDoButton)}
        if (name2 !== undefined){
            let buttonDone = document.createElement('button')
            selector.appendChild(buttonDone).innerHTML = name2
            selector.appendChild(buttonDone).addEventListener('click', doneToDoButton)}
        if (name3 !== undefined){
            let buttonDelete = document.createElement('button')
            selector.appendChild(buttonDelete).innerHTML = name3
            selector.appendChild(buttonDelete).addEventListener('click', deleteToDoButton)}
    }
}

document.addEventListener('DOMContentLoaded', renderArray)
addToDoButton.addEventListener('click', addToDo)
addToDoButton.addEventListener('click', inputFieldClearing)
inputField.addEventListener('keypress', enterino => {
	if (enterino.key === 'Enter') {
		addToDo()
		inputFieldClearing()
		}
	}
)

function renderArray () {
    container = JSON.parse(localStorage.getItem('ooptodo') || "[]")
    for (let val of container) {
        new LiCreator(val.text, val.id, val.done, val.editing)
    }

}

document.getElementById('switcher').addEventListener('input', function switcher () {
    let switcherValue = document.getElementById('switcher').options.selectedIndex
    function resetVisibility () {
        let resetter = Array.from(document.querySelectorAll('li'))
        resetter.forEach(function(selector){
            selector.classList.remove('hidden')})
    }
    switch (switcherValue) {
        case 1:
            resetVisibility ()
            let alltd = Array.from(document.querySelectorAll('li'))
            alltd.forEach(function (selector){
                selector.classList.remove('hidden')
            })
            break
        case 2:
            resetVisibility ()
            let currenttd = Array.from(document.querySelectorAll('.alreadydone'))
            currenttd.forEach(function (selector) {
                selector.classList.add('hidden');
              });
            break
        case 3:
            resetVisibility ()
            let donetd = Array.from(document.querySelectorAll('ul > li:not(.alreadydone)'))
            donetd.forEach(function (selector) {
                selector.classList.add('hidden');
              });
            break
    }
})

function addToDo(){
    let input = document.querySelector('#input').value
    let date = Date.now()
    let replaced = input.replace(/^\s+|\s+$/gm,'')
    if (replaced.length != 0 & replaced != ' ') {
        new LiCreator(replaced, date)
        new TodoCreator(replaced, date).pushing
    }
}

function inputFieldClearing() {
	inputField.value = ''
}

function editToDoButton () {
    let currentItem = this.parentNode
    let currentItemId = this.parentNode.id
    for (let i in container) {
        if (container[i].id === parseInt(currentItemId)) {
           container[i].editing = !container[i].editing
           container[i].editing == true ? new InputFieldCreator (currentItem, currentItemId, true) : new InputFieldCreator (currentItem, currentItemId, false)
           break
        }
    }
    localStorage.setItem('ooptodo', JSON.stringify(container))
}

function doneToDoButton() {
	let currentItem = this.parentNode
	let currentItemId = this.parentNode.id
    for (let i in container) {
        if (container[i].id === parseInt(currentItemId)) {
           container[i].done = !container[i].done
           break
        }
    }
	currentItem.classList.toggle('alreadydone')
    localStorage.setItem('ooptodo', JSON.stringify(container))
}

function deleteToDoButton () {
    let currentItem = this.parentNode
    let currentItemId = this.parentNode.id
    for(let val of container) {
        if (val.id == currentItemId){
            container = container.filter(item => item.id != currentItemId)
            localStorage.setItem('ooptodo', JSON.stringify(container))
        }
    }
    currentItem.remove()
}