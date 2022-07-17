const url = 'http://127.0.0.1:1080/';

const loginForm = document.querySelector('.login');
const loginButton = document.querySelector('.login__btn');
const menu = document.querySelector('.menu');
const addButton = document.querySelector('.add-btn');
const showButton = document.querySelector('.show-btn');
const tasks = document.querySelector('.tasks');

const login = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('.login__input').value;

    //fetch не выполнится на пустое поле input
    if(username) {
        const response = await fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify({username: username}),
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://foo.com'
            },
            // credentials: 'include' выдает ошибку
        })
            .then(response => response.json())
    
        
        //Если response true, то скрывает форму логина и открывает меню задач
        if(response) {
            loginForm.classList.toggle('login--hide')
            menu.classList.toggle('menu--activate')
        }
    }
    
};

const changeStatus = async () => {
    
};


const showTasks = async () => {
    tasks.innerHTML = ''; //Очищаю список при каждом вызове функции
    let taskList = [];

    //Получаю задачи и заношу их в массив taskList
    await fetch(url + 'task', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'cookie-name=MTY1NTIyMTQ2N3xEdi1CQkFFQ180SUFBUkFCRUFBQVJ2LUNBQUlHYzNSeWFXNW5EQW9BQ0hWelpYSnVZVzFsQm5OMGNtbHVad3dGQUFONVlXNEdjM1J5YVc1bkRBOEFEV0YxZEdobGJuUnBZMkYwWldRRVltOXZiQUlDQUFFPXxYeTIwGJ6lHgJCr60QRwnYGIFKmMCpJ8TunhhVpe85_Q==;'
        }
    })
        .then(response => response.json())
        .then(responseText => {
            taskList = responseText;
        })
    
    //Для каждого элемента массива создаю div с именем задачи и btn со статусом
    taskList.forEach((element) => {
        const taskItem = document.createElement('div');
        const taskName = document.createElement('div');
        const taskStatus = document.createElement('button');

        taskName.innerText = element.description;

        if(element.status = open) {
            taskStatus.innerText = 'Не выполнено';
        }else{taskStatus.innerText = 'Выполнено';}

        tasks.append(taskItem);
        taskItem.append(taskName);
        taskItem.append(taskStatus);

        //По клику на кнопку меняю статус
        taskStatus.onclick = changeStatus;
    })
};

const addTask = async () => {
    const addInput = document.querySelector('.add-input').value;
    
    //После проверки поля input добавляю задачу на сервер и обновляю список
    if(addInput) {
        await fetch(url + 'task', {
            method: 'PUT',
            body: JSON.stringify({description: addInput, status: 'open'}),
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'cookie-name=MTY1NTIyMTQ2N3xEdi1CQkFFQ180SUFBUkFCRUFBQVJ2LUNBQUlHYzNSeWFXNW5EQW9BQ0hWelpYSnVZVzFsQm5OMGNtbHVad3dGQUFONVlXNEdjM1J5YVc1bkRBOEFEV0YxZEdobGJuUnBZMkYwWldRRVltOXZiQUlDQUFFPXxYeTIwGJ6lHgJCr60QRwnYGIFKmMCpJ8TunhhVpe85_Q==;',
            },
        })
        
        showTasks()
    }
};

loginButton.onclick = login;
showButton.onclick = showTasks;
addButton.onclick = addTask;
