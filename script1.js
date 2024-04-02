//табы
let tabs = document.querySelectorAll('.tab-content')
let btnTabs = document.querySelectorAll('.tab-a')
tabs[0].style.display = 'block'
btnTabs.forEach((btnTab, index) => {
    btnTab.addEventListener('click', (event) => {
        event.preventDefault()

        tabs.forEach(tab => {
            tab.style.display = 'none'
        })
        tabs[index].style.display = 'block'
    })
})

//общая функция для всех модалок и подробнее
function show(elem) {
    elem.style.display = (elem.style.display === 'none' || elem.style.display === '') ? 'flex' : 'none'
}

//функция при невведенном поле
function error() {
    let errCont = document.querySelectorAll('.err')
    errCont.forEach(errContainer => {
        errContainer.style.display = 'block'
        setTimeout(() => {
            errContainer.style.display = 'none'
        }, 2000)
    })
}

//модалка для всех книг
let modalBook = document.querySelector('#modal-books')
let addBook = document.querySelector('#book-btn')
modalBook.style.display = 'none'


addBook.addEventListener('click', () => {
    show(modalBook)
})

//сохранить книжку
let btnBook = document.querySelector('#book-btn-modal')
let booksList = document.querySelector('#books-list')

//добавить новую книгу от пользователя
let otherBooks = [
    {
        id: 0,
        name: 'JS',
        author: 'Mike McGratt',
        page: 457,
        count: 3
    },
    {
        id: 1,
        name: 'Abai zholy',
        author: 'Mukhtar Auezov',
        page: 1252,
        count: 2
    }
]



//создать блок новый с книгами
function renderBooks() {
    otherBooks.forEach((book) => {
        let btnInputBook = document.createElement('button')
        btnInputBook.innerHTML = 'Подробнее'
        btnInputBook.classList.add('all-btns')

        let moreInfoBook = document.createElement('p')
        moreInfoBook.textContent = `Страницы: ${book.page}, Их осталось: ${book.count}`
        moreInfoBook.style.display = 'none'

        btnInputBook.addEventListener('click', () => {
            show(moreInfoBook)
        })

        let bookItem = document.createElement('div')
        bookItem.textContent = `Название: ${book.name}, Автор: ${book.author}`
        bookItem.classList.add('list')

        bookItem.append(btnInputBook)

        // проверка наличия элемента перед добавлением
        if (!booksList.querySelector(`[data-id="${book.id}"]`)) {
            bookItem.setAttribute('data-id', book.id)
            if (book.count > 0) {
                bookItem.appendChild(moreInfoBook)
                booksList.append(bookItem)
            }
            else {
                return
            }
        }
    })
}

//выводит уже имеющиеся книги заранее
renderBooks()

//для выборки книг
function selectBooks(otherBooks) {
    let select = selectBooksContainer.querySelector('select')
    if (!select) {
        select = document.createElement('select')
        selectBooksContainer.append(select)
    }

    select.innerHTML = ''
    otherBooks.forEach(book => {
        if (book.count > 0) {
            let option = document.createElement('option')
            option.value = book.name
            option.textContent = book.name
            select.append(option)
        }
    })
}

let nameBook = document.querySelector('#name-book')
let authorBook = document.querySelector('#author-book')
let pageBook = document.querySelector('#page-book')
let countBook = document.querySelector('#count-book')
let selectBooksContainer = document.querySelector('#select-container-book')

// выводит книги на экран
btnBook.addEventListener('click', () => {
    if (nameBook.value == '' || authorBook.value == '' || pageBook.value == '' || countBook.value == '') {
        error()
    } else {
        let newBook = {
            id: otherBooks.length,
            name: nameBook.value,
            author: authorBook.value,
            page: pageBook.value,
            count: countBook.value
        }

        otherBooks.push(newBook)


        selectBooks(otherBooks)
        booksList.innerHTML = ''
        renderBooks()
        modalBook.style.display = 'none'

    }
})

//2 страница

//модалка для пользователей
let modalUser = document.querySelector('#modal-users')
let addUser = document.querySelector('#user-btn')
modalUser.style.display = 'none'
addUser.addEventListener('click', () => {
    show(modalUser)
})

//сохранить пользователя
let btnUser = document.querySelector('#user-btn-modal')
let userList = document.querySelector('#users-list')

let otherUsers = [
    {
        id: 0,
        name: 'Diana',
        tel: 87475943910
    },
    {
        id: 1,
        name: 'Almas',
        tel: 87025648596
    }
]

//создает новый блок с пользователем
function renderUsers() {
    otherUsers.forEach((user) => {
        let btnInputUser = document.createElement('button')
        btnInputUser.innerHTML = 'Подробнее'
        btnInputUser.classList.add('all-btns')

        let userItem = document.createElement('div')
        userItem.innerHTML = `Имя: ${user.name}, Телефон: ${user.tel}`
        userItem.classList.add('list')

        userItem.append(btnInputUser)
        userList.append(userItem)


        let changeUserBtn = document.createElement('button')
        changeUserBtn.innerHTML = 'Изменить пользователя'
        changeUserBtn.classList.add('all-btns')
        changeUserBtn.style.display = 'none'

        userItem.appendChild(changeUserBtn)

        btnInputUser.addEventListener('click', () => {
            show(changeUserBtn)
        })

        let changeCont = document.querySelector('#change-user')
        let changeName = document.querySelector('#change-name-user')
        let changeTel = document.querySelector('#change-tel-user')

        changeUserBtn.addEventListener('click', () => {
            show(changeCont)

            changeName.value = user.name
            changeTel.value = user.tel


            //модальные окна для сохранения изменений в имени или телефоне уже имеющегося пользователя
            let saveBtnUser = document.querySelector('#change-save-btn')

            if (saveBtnUser) {
                saveBtnUser.addEventListener('click', () => {
                    user.name = changeName.value
                    user.tel = changeTel.value

                    userItem.innerHTML = `Имя: ${user.name}, Телефон: ${user.tel}`
                    changeCont.style.display = 'block'
                    show(changeCont)
                    selectUser(otherUsers)

                })
            }
            //удаление пользователя
            let delBtnUser = document.querySelector('#change-del-btn')

            if (delBtnUser) {
                delBtnUser.addEventListener('click', () => {
                    let i = otherUsers.indexOf(user)
                    if (i !== -1) {
                        otherUsers.splice(i, 1)
                    }
                    userItem.style.display = 'none'
                    userItem.textContent = ''
                    userList.append(userItem)
                    changeCont.style.display = 'block'
                    show(changeCont)
                    selectUser(otherUsers)
                })
            }
        })

    })
}

//выводит уже имеющихся пользователей
renderUsers()

let nameUser = document.querySelector('#name-user')
let telUser = document.querySelector('#tel-user')
let selectUsersContainer = document.querySelector('#select-container-user')

//для выборки пользователей
function selectUser(otherUsers) {
    let select = selectUsersContainer.querySelector('select')
    if (!select) {
        select = document.createElement('select')
        selectUsersContainer.append(select)
    }

    select.innerHTML = ''

    otherUsers.forEach(user => {
        let option = document.createElement('option')

        option.value = user.name
        option.textContent = user.name
        select.append(option)
    })
}

btnUser.addEventListener('click', () => {
    if (nameUser.value == '' || telUser.value == '') {
        error()
    } else {
        let newUser = {
            id: otherUsers.length,
            name: nameUser.value,
            tel: telUser.value
        }
        otherUsers.push(newUser)
        selectUser(otherUsers)
        userList.innerHTML = ''
        renderUsers()
        modalUser.style.display = 'none'
    }
})

//3 страница
selectBooks(otherBooks)
selectUser(otherUsers)
let addContact = document.querySelector('#contacts-btn')
let modalContacts = document.querySelector('#modal-contacts')
modalContacts.style.display = 'none'

addContact.addEventListener('click', () => {
    show(modalContacts)
})

//выводим карточки
let addCards = document.querySelector('#contacts-btn-modal')
let contactsTableBody = document.querySelector('#table-body')

//функция для таблицы
function renderCards(arr) {
    arr.forEach(elem => {

        let row = document.createElement('tr')

        let tableName = document.createElement('td')
        tableName.textContent = elem.user
        row.appendChild(tableName)

        let tableBook = document.createElement('td')
        tableBook.textContent = elem.book
        row.appendChild(tableBook)

        let tableStart = document.createElement('td')
        tableStart.textContent = elem.startDate
        row.appendChild(tableStart)

        let tableEnd = document.createElement('td')
        let endButton = document.createElement('button')
        endButton.textContent = 'Возврат книги'
        endButton.classList.add('all-btns')
        tableEnd.appendChild(endButton)
        row.appendChild(tableEnd)
        endButton.addEventListener('click', () => {
            endButton.style.display = 'none'
            elem.endDate = new Date().toLocaleDateString()
            tableEnd.append(elem.endDate)

        })

        let tableDel = document.createElement('td')
        let delButton = document.createElement('button')
        delButton.textContent = '✖'
        delButton.classList.add('all-btns')
        tableDel.appendChild(delButton)
        row.appendChild(tableDel)
        delButton.addEventListener('click', () => {
            row.style.display = 'none'

            //при нажатии на кнопку, книга увеличивается на 1 и селект обновялется
            let bookCountReturn = otherBooks.find(b => b.name === elem.book)
            if (bookCountReturn) {
                bookCountReturn.count++

                updateBook()
            }
        })

        contactsTableBody.appendChild(row)
    })
    modalContacts.style.display = 'none'
}

//обновляет селект
function updateBook() {
    let select = document.querySelector('#select-container-book select');
    select.innerHTML = '';
    selectBooks(otherBooks);
}


addCards.addEventListener('click', () => {
    let userSelect = document.querySelector('#select-container-user select')
    let bookSelect = document.querySelector('#select-container-book select')

    let user = userSelect.value
    let book = bookSelect.value


    if (user && book) {

        //при выборке книги и введении ее в таблицу книга ументшаегтся на 1
        let bookCountAdd = otherBooks.find(b => b.name === book)
        if (bookCountAdd && bookCountAdd.count > 0) {
            let cards = []
            let card = {
                id: Date.now(),
                user: user,
                book: book,
                startDate: new Date().toLocaleDateString(),
                endDate: null
            }
            cards.push(card)

            bookCountAdd.count--

            //проверка на количество книг
            if (bookCountAdd.count === 0) {
                let opt = bookSelect.querySelector(`option[value="${book}"]`)

                if (opt) {
                    opt.style.display = 'none'
                    opt.textContent = ''
                }
                updateBook()
            }

            //создаем таблицу и вводим туда данные
            renderCards(cards)
        }
    }
})

