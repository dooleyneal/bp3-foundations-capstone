//const { default: axios } = require("axios")


const grocerySelect = document.querySelector('#grocerySelect')
const addNewListBtn = document.querySelector('#addNewListBtn')
const newListName = document.querySelector('#newListName')
const listSelect = document.querySelector('#listSelect')
const quantity = document.querySelector('#quantity')
const addToListBtn = document.querySelector('#addToListButton')
const listContainer = document.querySelector('#listContainer')


const getLists = () => {
    axios.get('http://localhost:4005/grocery_lists')
    .then(res => {
        res.data.forEach(list => {
            const option = document.createElement('option')
            option.setAttribute('value', list.list_id)
            option.textContent = list.name
            listSelect.appendChild(option)
        })
    })
}

const getGroceries = () => {
    axios.get('http://localhost:4005/groceries')
        .then(res => {
            grocerySelect.innerHTML = ''
            res.data.forEach(grocery => {
                const option = document.createElement('option')
                option.setAttribute('value', grocery.grocery_id)
                option.textContent = grocery.name
                grocerySelect.appendChild(option)
            })
        }).catch(err => console.log(err))
}

const displayLists = () => {
    axios.get('http://localhost:4005/grocery_lists')
    .then(res => {
        res.data.forEach(elem => {
            if (!Boolean(document.getElementById(`${elem.list_id}`))) {
                let list = `<div class="List" id="${elem.list_id}">
                <h2 id="${elem.list_id}name">${elem.name}</h2>
                <span class="deleteList" onClick="deleteList(${elem.list_id})">x</span>
                <table>
                    <tr>
                        <thead>Item</thead>
                        <thead>Quantity</thead>
                        <thead>Price</thead>
                        <thead></thead>
                    </tr>
                </table>`
                console.log(list)
                listContainer.innerHTML += list
            } 
        })
    })

}


const createNewList = () => {
    let bodyObj = {
        name: newListName.value
    }
    console.log(bodyObj)
    axios.post('http://localhost:4005/grocery_lists', bodyObj)
    .then(() => {
        displayLists()
        newListName.value = ''
    })
}

const deleteList = (list_id) => {
    const listName = document.getElementById(`${list_id}name`).innerText
    console.log(listName)
    axios.delete(`http://localhost:4005/grocery_lists/${list_id}`, {data: {name: listName }})
    .then(() => {
        displayLists()
    })
}



addNewListBtn.addEventListener('click', (event) => {
    event.preventDefault()
    createNewList()

})




getGroceries()
getLists()
displayLists()