

const grocerySelect = document.querySelector('#grocery-select')
const addNewListBtn = document.querySelector('#addNewListBtn')
const newListName = document.querySelector('#newListName')
const listSelect = document.querySelector('#listSelect')
const quantity = document.querySelector('#quantity')
const addToListBtn = document.querySelector('#addToListButton')

const getLists = () => {
    axios.get('http://localhost:4005/grocery_lists')
    .then(res => {
        res.data.forEach(list => {
            const option = document.createElement('option')
            option.setAttribute('value', list[id])
            option.textContent = grocery.name
            listSelect.appendChild(option)
        })
    })
}

const getGroceries = () => {
    axios.get('http://localhost:4005/groceries/')
        .then(res => {
            res.data.forEach(grocery => {
                const option = document.createElement('option')
                option.setAttribute('value', grocery[grocery_id])
                option.textContent = grocery.name
                grocerySelect.appendChild(option)
            })
        })
}

const displayLists = () => {
    axios.get('http://localhost:4005/grocery_lists')
    .then(res => {
        res.data.forEach(elem => {
            let list = `<div class="List" id="${elem.id}">
            <h2>${elem.name}</h2>
            <span class="deleteList">x</span>
            <table>
                <tr>
                    <thead>Item</thead>
                    <thead>Quantity</thead>
                    <thead>Price</thead>
                    <thead></thead>
                </tr>
            </table>`
            document.querySelector('body').appendChild(list) 
        })
    })

}


const createNewList = () => {
    let bodyObj = {
        name: newListName.value
    }
    axios.post('http://localhost:4005/grocery_lists', bodyObj)
    .then(() => {
        displayLists()
        newListName.value = ''
    })
}


addNewListBtn.addEventListener('click', (event) => {
    event.preventDefault()
    createNewList()

})

