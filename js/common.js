let removeSVG = `<svg enable-background="new 0 0 486.4 486.4" version="1.1" viewBox="0 0 486.4 486.4" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
<path d="M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5    S32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5    S453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2    c0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z"/>
<path d="m243.2 411c7.5 0 13.5-6 13.5-13.5v-238.6c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v238.5c0 7.5 6 13.6 13.5 13.6z"/>
<path d="m155.1 396.1c7.5 0 13.5-6 13.5-13.5v-208.9c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6.1 13.5 13.5 13.5z"/>
<path d="m331.3 396.1c7.5 0 13.5-6 13.5-13.5v-208.9c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6 13.5 13.5 13.5z"/>
</svg>`,
    completeSVG = `<svg enable-background="new 0 0 95.878 95.878" version="1.1" viewBox="0 0 95.878 95.878" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
    <path d="m47.939 0c-26.46 0-47.88 21.446-47.88 47.939s21.42 47.939 47.88 47.939 47.88-21.446 47.88-47.939-21.42-47.939-47.88-47.939zm0 87.467c-21.84 0-39.48-17.662-39.48-39.529s17.64-39.528 39.48-39.528 39.48 17.662 39.48 39.529-17.64 39.528-39.48 39.528z"/>
    <path d="m63.899 32.38l-22.26 22.287-10.5-10.513c-1.68-1.682-4.2-1.682-5.88 0s-1.68 4.205 0 5.887l13.44 13.457c0.84 0.841 2.1 1.262 2.94 1.262s2.1-0.421 2.94-1.262l25.2-25.231c1.68-1.682 1.68-4.205 0-5.887s-4.2-1.682-5.88 0z"/>
</svg>`,
    addButton = document.getElementById('add'),
    input = document.getElementById('item'),
    data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        done: []
    };

    renderTodoList();

addButton.addEventListener('click', function() {
    let value = input.value;
    if (value) {
        addItem(value);
        input.value = ''; 

        data.todo.push(value);
    };
});

function renderTodoList() {
    if(!data.todo.length && !data.done.length) return;

    for (let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];
        addItem(value);
    };

    for (let i = 0; i < data.done.length; i++) {
        let value = data.done[i];
        addItem(value, true);
    };
}

input.addEventListener('keypress', function(event) {
    let value = input.value;
    if (event.which === 13) {
        if (value) {
            data.todo.push(value);
            addItem(value);
            input.value = ''; 
        };
    }
});

function removeItem() {
    let item = this.parentNode.parentNode,
        parent = item.parentNode,
        className = parent.className,
        value = item.innerText;

        if (className == 'todo') {
            data.todo.splice(data.todo.indexOf(value), 1);
        } else {
            data.done.splice(data.done.indexOf(value), 1);
        }

        
    parent.removeChild(item);

    dataUpdate();
}

function completeItem() {
    let item = this.parentNode.parentNode,
        parent = item.parentNode,
        className = parent.className,
        target = (className == 'todo') ? document.querySelector('.done') : document.querySelector('.todo'),
        value = item.innerText;

    if ( className == 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.done.push(value);
} else {
    data.done.splice(data.done.indexOf(value), 1);
    data.todo.push(value);
}
   
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataUpdate();
}

function addItem(text, completed) {
    let list = (completed) ? document.querySelector('.done') : document.querySelector('.todo');

    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let aRemove = document.createElement('a');
    aRemove.classList.add('remove');
    aRemove.href = '#';
    aRemove.innerHTML = removeSVG;

    aRemove.addEventListener('click', removeItem);

    let aComplete = document.createElement('a');
    aComplete.classList.add('complete');
    aComplete.href = '#';
    aComplete.innerHTML = completeSVG;

    aComplete.addEventListener('click', completeItem);

    buttons.appendChild(aRemove);
    buttons.appendChild(aComplete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);

    dataUpdate();
}


function dataUpdate() {
    localStorage.setItem('todoList', JSON.stringify(data));
}