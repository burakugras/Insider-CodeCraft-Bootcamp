const form = document.querySelector('.todo-form');
const titleInput = document.querySelector('.todo-input');
const descInput = document.querySelector('.todo-desc');
const todoContainer = document.querySelector('.todo-container');
const filterCompletedBtn = document.getElementById('filter-completed');
const showAllBtn = document.getElementById('show-all');
const container = document.querySelector('.container');

const startConf = () => {
    todoContainer.innerHTML = "";
};

const showWarning = (message) => {
    const warningDiv = document.createElement('div');
    warningDiv.classList.add('warning-div');
    warningDiv.textContent = message;
    container.prepend(warningDiv);

    setTimeout(() => {
        warningDiv.remove();
    }, 2000);
};

const addHTML = (todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (todo.isCompleted) {
        todoDiv.classList.add('completed');
    }

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('todo-header');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('todo-left');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleComplete(e);
    });

    const spanTitle = document.createElement('span');
    spanTitle.classList.add('todo-text');
    spanTitle.textContent = todo.title;

    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('todo-priority');
    prioritySpan.textContent = todo.priority;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(spanTitle);
    leftDiv.appendChild(prioritySpan);
    headerDiv.appendChild(leftDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('todo-actions');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-delete');
    deleteBtn.textContent = 'Sil';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(e);
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('todo-edit');
    editBtn.textContent = 'Düzenle';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editTodo(e);
    });

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('todo-save');
    saveBtn.textContent = 'Kaydet';
    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveTodo(e);
    });

    actionsDiv.appendChild(deleteBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(saveBtn);
    headerDiv.appendChild(actionsDiv);

    const descP = document.createElement('p');
    descP.classList.add('todo-desc');
    descP.textContent = todo.desc;

    const editTitleInput = document.createElement('input');
    editTitleInput.classList.add('todo-editInput');
    editTitleInput.value = todo.title;
    editTitleInput.style.display = 'none';

    const editDescInput = document.createElement('textarea');
    editDescInput.classList.add('todo-editDescInput');
    editDescInput.value = todo.desc;
    editDescInput.style.display = 'none';

    todoDiv.appendChild(headerDiv);
    todoDiv.appendChild(descP);
    todoDiv.appendChild(editTitleInput);
    todoDiv.appendChild(editDescInput);
    todoContainer.appendChild(todoDiv);
};

const addTodo = (e) => {
    e.preventDefault();
    try {
        const titleVal = titleInput.value.trim();
        const descVal = descInput.value.trim();
        const selectedPriority = document.querySelector('input[name="priority"]:checked');

        if (titleVal === "") {
            showWarning('Başlık alanı boş bırakılamaz!');
            return;
        }
        if (!selectedPriority) {
            showWarning('Lütfen bir öncelik seçiniz!');
            return;
        }

        const todo = {
            title: titleVal,
            desc: descVal,
            priority: selectedPriority.value,
            isCompleted: false
        };

        addHTML(todo);
        form.reset();
    } catch (error) {
        showWarning('Beklenmeyen bir hata oluştu!');
        console.error(error);
    }
};

const deleteTodo = (e) => {
    try {
        const todoDiv = e.target.closest('.todo');
        todoDiv.remove();
    } catch (error) {
        showWarning('Silme işlemi başarısız oldu!');
        console.error(error);
    }
};

const toggleComplete = (e) => {
    try {
        const todoDiv = e.target.closest('.todo');
        todoDiv.classList.toggle('completed');
    } catch (error) {
        showWarning('Durum değiştirme işlemi başarısız oldu!');
        console.error(error);
    }
};

const editTodo = (e) => {
    try {
        const todoDiv = e.target.closest('.todo');
        const titleSpan = todoDiv.querySelector('.todo-text');
        const descP = todoDiv.querySelector('.todo-desc');
        const editTitleInput = todoDiv.querySelector('.todo-editInput');
        const editDescInput = todoDiv.querySelector('.todo-editDescInput');

        editTitleInput.value = titleSpan.textContent;
        editDescInput.value = descP.textContent;

        titleSpan.style.display = 'none';
        descP.style.display = 'none';
        editTitleInput.style.display = 'block';
        editDescInput.style.display = 'block';
    } catch (error) {
        showWarning('Düzenleme moduna geçilemedi!');
        console.error(error);
    }
};

const saveTodo = (e) => {
    try {
        const todoDiv = e.target.closest('.todo');
        const titleSpan = todoDiv.querySelector('.todo-text');
        const descP = todoDiv.querySelector('.todo-desc');
        const editTitleInput = todoDiv.querySelector('.todo-editInput');
        const editDescInput = todoDiv.querySelector('.todo-editDescInput');

        const newTitle = editTitleInput.value.trim();
        const newDesc = editDescInput.value.trim();

        if (newTitle === "") {
            showWarning('Başlık boş bırakılamaz!');
            return;
        }

        titleSpan.textContent = newTitle;
        descP.textContent = newDesc;

        titleSpan.style.display = 'block';
        descP.style.display = 'block';
        editTitleInput.style.display = 'none';
        editDescInput.style.display = 'none';
    } catch (error) {
        showWarning('Kaydetme işlemi başarısız oldu!');
        console.error(error);
    }
};

const filterCompleted = () => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        if (!todo.classList.contains('completed')) {
            todo.style.display = 'none';
        }
    });
    filterCompletedBtn.classList.add('hidden');
    showAllBtn.classList.remove('hidden');
};

const showAll = () => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        todo.style.display = 'block';
    });
    showAllBtn.classList.add('hidden');
    filterCompletedBtn.classList.remove('hidden');
};

form.addEventListener('submit', addTodo);
filterCompletedBtn.addEventListener('click', filterCompleted);
showAllBtn.addEventListener('click', showAll);

startConf();
