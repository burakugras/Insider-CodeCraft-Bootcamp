function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    $('.task').each(function () {
        const text = $(this).find('.task-text').text();
        const completed = $(this).find('.task-text').hasClass('completed');
        tasks.push({ text, completed });
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(input, completed = false) {
    const taskHTML = `
        <li class="task">
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <span class="task-text ${completed ? 'completed' : ''}">${input}</span>
            <button class="delete-button">Sil</button>
        </li>
        `;
    $('.task-list').append(taskHTML);
}

$('#save-button').click(function () {
    const input = $('#input').val();
    if (input.trim() !== '') {
        addTaskToDOM(input);
        saveTasks();
        $('#input').val('');
    }
});

function deleteTask(event) {
    $(event.target).closest('.task').remove();
}

$('.task-list').on('click', '.delete-button', deleteTask);

function toggleTask(event) {
    $(event.target).siblings('.task-text').toggleClass('completed');
    saveTasks();
}

$('.task-list').on('click', '.checkbox', toggleTask);

$(document).ready(loadTasks());
