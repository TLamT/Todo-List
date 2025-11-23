document.addEventListener('DOMContentLoaded', () => {
    const addTask = document.getElementById('AddTask');
    const taskList = document.getElementById('TaskList');
    const completedList = document.getElementById('CompletedTaskList');
    const taskInput = document.getElementById('TaskInput');

    let tasks = loadTasks();
    let completed = loadCompletedTasks();

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function saveCompletedTasks() {
        localStorage.setItem('completed', JSON.stringify(completed));
    }

    function loadTasks() {
        try {
            const raw = localStorage.getItem('tasks');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    function loadCompletedTasks() {
        try {
            const raw = localStorage.getItem('completed');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((t, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = t;

            const completeBtn = document.createElement('button');
            completeBtn.textContent = '完成';
            completeBtn.addEventListener('click', () => {
                // 移到已完成
                const item = tasks.splice(index, 1)[0];
                completed.push(item);
                saveTasks();
                saveCompletedTasks();
                renderTasks();
                renderCompleted();
            });

            const del = document.createElement('button');
            del.textContent = '刪除';
            del.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(completeBtn);
            li.appendChild(del);
            taskList.appendChild(li);
        });
    }

    function renderCompleted() {
        if (!completedList) return;
        completedList.innerHTML = '';
        completed.forEach((t, index) => {
            const li = document.createElement('li');
            li.className = 'completed-item';
            li.textContent = t;

            const restoreBtn = document.createElement('button');
            restoreBtn.textContent = '恢復';
            restoreBtn.addEventListener('click', () => {
                const item = completed.splice(index, 1)[0];
                tasks.push(item);
                saveCompletedTasks();
                saveTasks();
                renderCompleted();
                renderTasks();
            });

            const del = document.createElement('button');
            del.textContent = '刪除';
            del.addEventListener('click', () => {
                completed.splice(index, 1);
                saveCompletedTasks();
                renderCompleted();
            });

            li.appendChild(restoreBtn);
            li.appendChild(del);
            completedList.appendChild(li);
        });
    }

    addTask.addEventListener('click', () => {
        const value = taskInput.value.trim();
        if (!value) return;
        tasks.push(value);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    });

    // 支援按 Enter 新增
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask.click();
    });

    renderTasks();
    renderCompleted();
});