document.getElementById('addListBtn').addEventListener('click', addList);

function addList() {
    const listNameInput = document.getElementById('listNameInput');
    const listName = listNameInput.value.trim();
    const listsContainer = document.getElementById('listsContainer');

    if (listName) {
        const listContainer = document.createElement('div');
        listContainer.className = 'list';

        const listTitle = document.createElement('h2');
        listTitle.textContent = listName;

        const taskInputGroup = document.createElement('div');
        taskInputGroup.className = 'task-input-group';

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.placeholder = 'Add a new task';

        const taskTime = document.createElement('input');
        taskTime.type = 'number';
        taskTime.placeholder = 'Time (min)';
        taskTime.min = '1';

        const taskDate = document.createElement('input');
        taskDate.type = 'date';

        const addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = 'Add Task';
        addTaskBtn.addEventListener('click', () => addTask(taskInput, taskTime, taskDate, taskList));

        taskInputGroup.appendChild(taskInput);
        taskInputGroup.appendChild(taskTime);
        taskInputGroup.appendChild(taskDate);
        taskInputGroup.appendChild(addTaskBtn);

        const taskList = document.createElement('ul');

        listContainer.appendChild(listTitle);
        listContainer.appendChild(taskInputGroup);
        listContainer.appendChild(taskList);
        listsContainer.appendChild(listContainer);

        listNameInput.value = '';
    }
}

function addTask(taskInput, taskTime, taskDate, taskList) {
    const taskText = taskInput.value.trim();
    const timeInMinutes = parseInt(taskTime.value.trim());
    const dueDate = taskDate.value;

    if (taskText && timeInMinutes > 0 && dueDate) {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} (Due: ${dueDate})`;

        const timerSpan = document.createElement('span');
        timerSpan.className = 'timer';
        timerSpan.textContent = `${timeInMinutes} min`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(timerSpan);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);

        startTimer(listItem, timeInMinutes);

        taskInput.value = '';
        taskTime.value = '';
        taskDate.value = '';
    }
}

function startTimer(listItem, timeInMinutes) {
    let time = timeInMinutes * 60;
    const timerSpan = listItem.querySelector('.timer');

    const interval = setInterval(() => {
        if (listItem.classList.contains('completed')) {
            clearInterval(interval);
            return;
        }
        
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerSpan.textContent = `${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;

        if (time <= 0) {
            clearInterval(interval);
            timerSpan.textContent = 'Time up!';
        }
        time--;
    }, 1000);
}
