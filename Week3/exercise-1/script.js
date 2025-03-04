$(document).ready(function () {

    function addTaskToDOM(input) {
        const taskHTML = `
        <li class="task">
            <input type="checkbox" class="checkbox">
            <span class="task-text">${input}</span>
            <button class="delete-button">Delete</button>
        </li>
        `
        $('.task-list').append(taskHTML);
    }

    $('#save-button').click(function () {
        const input = $('#input').val();
        if (input.trim() !== '') {
            addTaskToDOM(input);
            $('#input').val('');
        }
    });

    function deleteTask(event) {
        $(event.target).closest('.task').remove();
    }

    $('.task-list').on('click', '.delete-button', deleteTask);

    function toggleTask(event) {
        $(event.target).siblings('.task-text').toggleClass('completed');
    }

    $('.task-list').on('click', '.checkbox', toggleTask);
});