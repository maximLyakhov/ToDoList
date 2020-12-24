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
        // or unshift
        localStorage.setItem('ooptodo', JSON.stringify(container))
    }
}

class LiCreate {
	constructor(input, id, done, editing) {
        let li = document.createElement('li')
        list.prepend(li)
        li.innerHTML = input
        li.setAttribute('id', id)

        if (done) {
            li.className = 'alreadydone'
        }
        if (editing) {
            new InputFieldCreator(li, id, true)
        }
        new ButtonSet(li, 'Edit', 'Done', 'Delete')
    }
}

class LiCreateInProgress {
    constructor(){

    }
}

class LiCreateDone {
    constructor(){

    }
}

class InputFieldCreator {
    constructor(selector, id, boolean) {
        this.id = id
        let inputToDo = document.createElement('input')
        if (boolean) {
            inputToDo.value = selector.childNodes[0].data
            selector.prepend(inputToDo)
            inputToDo.classList.add(id)
            inputToDo.focus();
            inputToDo.select();
            selector.childNodes[1].data = ''
            new InputFieldHook(selector, id)
        }
        if (!boolean) {
            for (let i in container) {
                if (container[i].id === parseInt(id)) {
                    selector.childNodes[1].data = container[i].text
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
                    container[i].text = this.value
                        .trim()
                        .replace(/^\s+|\s+$/gm,'')
                    if (this.value !== ' ' && this.value.length > 0 && this.value !== null) {} else {
                        container.splice(i, 1)
                        document.getElementById(id).remove()
                    }
                    localStorage.setItem('ooptodo', JSON.stringify(container))
                    break
                }
            }
        }
    }
}
// switch here
class ButtonSet {
    constructor(selector, name, name2, name3){
        new EditButton(selector, document.createElement('button'), name)
        new DoneButton(selector, document.createElement('button'), name2)
        new DeleteButton(selector, document.createElement('button'), name3)
    }
}

class EditButton {
    constructor(selector, attachment, name) {
        selector.appendChild(attachment).innerHTML = name
        selector.appendChild(attachment).addEventListener('click', () =>
            {
            for (let i in container) {
                if (container[i].id === parseInt(selector.id)) {
                   container[i].editing = !container[i].editing
                   container[i].editing ? 
                   new InputFieldCreator (selector, selector.id, true)
                   : 
                   new InputFieldCreator (selector, selector.id, false)
                   break
                }
            }
            localStorage.setItem('ooptodo', JSON.stringify(container))
            }
        )
    }
}

class DoneButton {
    constructor(selector, attachment, name) {
        selector.appendChild(attachment).innerHTML = name
        selector.appendChild(attachment).addEventListener('click', () =>
            {
            for (let i in container) {
                if (container[i].id === parseInt(selector.id)) {
                   container[i].done = !container[i].done
                   break
                }
            }
            selector.classList.toggle('alreadydone')
            localStorage.setItem('ooptodo', JSON.stringify(container))
            }
        )
    }
}

class DeleteButton {
    constructor(selector, attachment, name) {
        selector.appendChild(attachment).innerHTML = name
        selector.appendChild(attachment).addEventListener('click', () =>
            {
            for(let i in container) {
                if (container[i].id === parseInt(selector.id)) {
                container.splice(i, 1)
                }
            }
            localStorage.setItem('ooptodo', JSON.stringify(container))
            selector.remove()
            }
        )
    }
}

document.addEventListener('DOMContentLoaded', function renderArray () {
    container = JSON.parse(localStorage.getItem('ooptodo') || "[]")

// place switch here with
// array methods to pick done and undone items
// then new LiCreate
// new licreateinprogress
// new licreatedone
// with only needed buttons

    for (let val of container) {
        new LiCreate(val.text, val.id, val.done, val.editing)
    }
})

addToDoButton.addEventListener('click', addToDo)
addToDoButton.addEventListener('click', inputFieldClearing)
inputField.addEventListener('keypress', enterino => {
	if (enterino.key === 'Enter') {
		addToDo()
		inputFieldClearing()
		}
	}
)

function inputFieldClearing() {
	inputField.value = ''
}

document.getElementById('itemsOnPage').addEventListener('input', function itemsOnPage () {
    let selectedRange = parseInt(document.getElementById('itemsOnPage').value)
    let pageNumber = 0
    let tempArray = []
    let pages = []
    // let times = Math.ceil(container.length / selectedRange)
    // console.log(times);
    for (let i = 0; i < container.length; i += selectedRange) {
        tempArray = container.slice(i, i + selectedRange);
        pageNumber++
        console.log(tempArray);
        pages.push(pageNumber)
    }
    // i should nest arrays into new array from container
    new Paginator(pages)
    }
)

document.getElementById('switcher').addEventListener('input', function switcher () {
    (function resetVisibility () {
        let resetter = Array.from(document.querySelectorAll('li'))
        resetter.forEach(function(selector){
            selector.classList.remove('hidden')})
    })()
    let switcherValue = document.getElementById('switcher').options.selectedIndex
    let action = new String;
    switch (switcherValue) {
        case 1:
            elements = Array.from(document.querySelectorAll('li'));
            action = 'remove'
            break
        case 2:
            elements = Array.from(document.querySelectorAll('.alreadydone'))
            action = 'add'
            break
        case 3:
            elements = Array.from(document.querySelectorAll('ul > li:not(.alreadydone)'))
            action = 'add'
            break
    }
    toggleVisibleElements(elements,  action)
    function toggleVisibleElements(elements, action)  {
        elements.forEach(function (selector) {
            action == 'add' ? selector.classList.add('hidden') : selector.classList.remove('hidden') 
          })
    }
})

function addToDo(){
    let input = document.querySelector('#input').value
        .replace(/^\s+|\s+$/gm,'')
    let date = Date.now()
    if (input.length != 0 & input != ' ') {
        new LiCreate(input, date)
        new TodoCreator(input, date).pushing
    }
}

class PageContent {
    constructor(val) {
        let page = document.querySelector('.pages')
        let li = document.createElement('li')
        page.appendChild(li)
        li.innerHTML = val
    }
}

class Paginator {
    constructor(array){
        let node = document.querySelector('.pages');
        while (node.firstChild) {
            node.removeChild(node.lastChild)
        }
        array.forEach((i)=> {
            let paginator = document.querySelector('.pages')
            let button = document.createElement('button')
            paginator.appendChild(button)
            paginator.appendChild(button).className = 'pageButton'
            paginator.appendChild(button).innerHTML = i
            paginator.appendChild(button).addEventListener('click', () => console.log(i))
        })
    }
}