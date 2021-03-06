// place switch with
// array methods to pick done and undone items
// then new LiCreate
// new licreateinprogress
// new licreatedone
// with only appropriate buttons
// make pages render only selected state items and based on pick range
// make page buttons interactive and logical
// filtered arrays to lets

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

class LiCreate {
	constructor(input, id, done, editing) {
        let li = document.createElement('li')
        list.prepend(li)
        li.textContent = input
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

class LiCreateInProgress extends LiCreate {
    constructor(input, id, done, editing){
        super(input, id, done, editing)

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
            inputToDo.addEventListener('select', resizeInput)
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

function resizeInput() {
    this.style.width = this.value.length + "ch"
}

class InputFieldHook {
    constructor(selector, id) {
        this.id = id
        let hookedInput = document.getElementById(id).querySelector('input')
        hookedInput.addEventListener('input', resizeInput)
        hookedInput.addEventListener('input', checking)
        hookedInput.addEventListener('keypress', enterino => {
            if (enterino.key === 'Enter') {
                selector.childNodes[1].data = hookedInput.value
                let elements = document.getElementsByClassName(id)
                while (elements.length > 0) elements[0].remove()
            }
        })
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

class ButtonSet {
    constructor(selector, name, name2, name3){
        let buttonframe = document.createElement('div')
        buttonframe.className = 'buttonSet'
        let createbuttonframe = selector.appendChild(buttonframe)
        new EditButton(selector, createbuttonframe, document.createElement('button'), name)
        new DoneButton(selector, createbuttonframe, document.createElement('button'), name2)
        new DeleteButton(selector, createbuttonframe, document.createElement('button'), name3)
    }
}

class EditButton {
    constructor(selector, buttonsetdiv, attachment, name) {
        buttonsetdiv.appendChild(attachment).textContent = name
        buttonsetdiv.appendChild(attachment).classList.add('waves-effect', 'waves-light', 'btn-small')
        buttonsetdiv.appendChild(attachment).addEventListener('click', () =>
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
    constructor(selector, buttonsetdiv, attachment, name) {
        buttonsetdiv.appendChild(attachment).textContent = name
        buttonsetdiv.appendChild(attachment).classList.add('waves-effect', 'waves-light', 'btn-small')
        buttonsetdiv.appendChild(attachment).addEventListener('click', () =>
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
    constructor(selector, buttonsetdiv, attachment, name) {
        buttonsetdiv.appendChild(attachment).textContent = name
        buttonsetdiv.appendChild(attachment).classList.add('waves-effect', 'waves-light', 'btn-small')
        buttonsetdiv.appendChild(attachment).addEventListener('click', () =>
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

document.addEventListener('DOMContentLoaded', renderArray)
function renderArray () {
    container = JSON.parse(localStorage.getItem('ooptodo') || "[]")
    for (let val of container) {
        new LiCreate(val.text, val.id, val.done, val.editing)
    }
}

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

document.getElementById('itemsOnPage').addEventListener('input', function itemsOnPage () {
    let selectedRange = parseInt(document.getElementById('itemsOnPage').value)
    let pageCount = Math.ceil(container.length / selectedRange)
    new Paginator(pageCount, selectedRange)
})

class Paginator {
    constructor(value, selectedRange) {
        let paginator = document.querySelector('.pages')
        while (paginator.firstChild) {
            paginator.removeChild(paginator.lastChild)
        }
        if (value > 1) {
            let pageCount = value
            let pageArray = [];
            for (let i=1; i <= pageCount; i++) {
                pageArray.push(i);
            }
            pageArray.forEach((number) => {
                let createPageButton = document.createElement('button')
                let page = paginator.appendChild(createPageButton)
                page.className = 'pageButton'
                page.classList.add('waves-effect', 'waves-light', 'btn-small')
                page.textContent = number
                page.addEventListener('click', () => pagePickContent(number, selectedRange))})
        } else {
            liEraser();
            renderArray();
        }
    }
}

function pagePickContent (number, selectedRange) {
    let rangeMultiplier = number * selectedRange
    let output = new Array;
    let pre = container.reverse()
    // rewrite to sort method
    switch (number) {
        case 1:
            output = pre.slice(0, selectedRange)
            new PageCreate(output)
            break;
        default:
            output = pre.slice(selectedRange * number - selectedRange, rangeMultiplier)
            new PageCreate(output)
            break;
    }
}

class PageCreate {
	constructor(array) {
        liEraser()
        for (let item in array) {
            let id = array[item].id
            let input = array[item].text    
            let li = document.createElement('li')
            list.appendChild(li)
            li.textContent = input
            li.setAttribute('id', id)
            new ButtonSet(li, 'Edit', 'Done', 'Delete')
        }
    }
}

function liEraser () {
    while (list.firstChild) {
        list.removeChild(list.lastChild)
    }
}

