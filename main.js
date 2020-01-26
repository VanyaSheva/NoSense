let users = [
    {
        name: 'Alex',
        age: 25
    },
    {
        name: 'John',
        age: 28
    },
    {
        name: 'Trevor',
        age: 30
    },
    {
        name: 'Pole',
        age: 18
    }
];
const wrapper = document.querySelector('.user-wrapper');
const buttonWrapper = document.querySelector('.button-wrapper');
const sort = document.querySelector('.sort');
const destroy = document.querySelector('.destroy');
const create = document.querySelector('.js-create');
let sortDirection = 1;

const createUserMarkup = (user) => {
    const div = document.createElement('div');
    const textName = document.createElement('p');
    textName.classList.add('name');
    const textAge =  document.createElement('p');
    textAge.classList.add('age');
    div.classList.add('user');
    textName.textContent = user.name;
    textAge.textContent = user.age;
    div.append(textName, textAge);
    return div;
};

function renderUserList(users) {
    const userList = users.map(user => createUserMarkup(user));
    wrapper.append(...userList);
}

renderUserList(users);

function sortUserList(users){
    const sortByAge = (a, b) => (a.age - b.age) * sortDirection;
    renderUserList(users.sort(sortByAge));
    sortDirection = sortDirection * -1;
}
function sortUsers() {
    wrapper.innerHTML = '';
    sortUserList(users);
}


create.addEventListener('click', createNewMarkup);
sort.addEventListener('click', sortUsers);
destroy.addEventListener('click', deleteElem);
wrapper.addEventListener('click', handleActiveUser);


function deleteUserFromArray(name, array) {
    users = array.filter(user => user.name !== name);
}
function createNewMarkup() {
    create.remove();
    users = [
        {
            name: 'Alex',
            age: 25
        },
        {
            name: 'John',
            age: 28
        },
        {
            name: 'Trevor',
            age: 30
        },
        {
            name: 'Pole',
            age: 18
        }
    ];
    renderUserList(users);
    buttonWrapper.append(sort);
    sort.addEventListener('click', sortUsers);
    buttonWrapper.append(destroy);
    destroy.addEventListener('click', deleteElem);
    console.log(users);
    console.log(users);
}


function deleteElem() {
    const removeElem = wrapper.lastChild;
    const removeElemName = removeElem.firstChild.textContent;
    removeElem.remove();
    deleteUserFromArray(removeElemName, users);
    if(wrapper.children.length === 0){
        if(!buttonWrapper.classList.contains('js-create')){
            buttonWrapper.append(create);
        }
        create.classList.replace('hide','show');
        destroy.removeEventListener('click', deleteElem);
        destroy.remove();
        sort.removeEventListener('click', sortUsers);
        sort.remove();
    }
}

function handleActiveUser(e) {
    const elements = Array.from(document.querySelectorAll('.user'));
    const elem = e.target;
    const activeLink = document.querySelector('.active');
    for (let i = 0; i < elements.length; i++){
        if(elem !== e.currentTarget && elem === elements[i] || (elem === elements[i].firstChild || elem === elements[i].lastChild)){
            elements[i].classList.toggle('active');
        }
    }
    if (activeLink && elem !==e.currentTarget){
        activeLink.classList.remove('active');
    }
}