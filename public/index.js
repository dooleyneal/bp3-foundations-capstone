

const grocerySelect = document.querySelector('#grocerySelect')
const addNewListBtn = document.querySelector('#addNewListBtn')
const newListName = document.querySelector('#newListName')
const listSelect = document.querySelector('#listSelect')
const addToListBtn = document.querySelector('#addToListBtn')
const listContainer = document.querySelector('#listContainer')



const getLists = () => {
    axios.get('http://localhost:4005/grocery_lists')
    .then(res => {
        res.data.forEach(list => {
            const option = document.createElement('option')
            console.log(list)
            option.setAttribute('value', list.list_id)
            option.setAttribute(`id`, `list` + `${list.list_id}`)
            option.setAttribute('name', list.name)
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
                option.setAttribute('id', `grocery` + `${grocery.grocery_id}`)
                option.setAttribute('name', grocery.name)
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
                var list = `<div class="List" id="${elem.list_id}">
                <h2 id="${elem.list_id}name">${elem.name}</h2>
                <button class="deleteList" onClick="deleteList(${elem.list_id})">x</button>`

                console.log(displayListItems(elem, ''))
                
                console.log(list)
                listContainer.innerHTML += list
            } 
        })
    })

}

const displayListItems = (elem, listAdder) => {
    axios.post(`http://localhost:4005/groceries`, {data: {name: elem.name}})
    .then((listRes) => { 
        console.log(listRes.data)
        listRes.data.forEach(listItem => {

             //console.log(listItem)
            listAdder += `<div class="listItem">
            <p class="itemName">${listItem.name}</p>
            <p class="itemDepartment">${listItem.department}</p>
            <p class="itemSize">${listItem.size}</p>
            <p class="itemPrice">${listItem.price}<p>
            <button class="itemDelete" id="${listItem.grocery_id}deleteFrom${elem.list_id}" onClick="deleteItem(${listItem.grocery_id}, "${elem.name}")">x</button>
            </div>`

            console.log(listAdder)
        })
        console.log(listAdder)
    })
    return listAdder
}

const deleteItem = (grocery_id, listName) => {
    axios.put(`http://localhost:4005/grocery/${grocery_id}`, {data: {name: listName}})
    .then(() => {
        displayLists()
    })
}

const createNewList = () => {
    if(Boolean(document.querySelector(`[name="${newListName.value}"]`)) || /[.,!?@#$%^&*()\-+={}\[\];:'"`~<>\\\/]/.test(newListName.value)) {
        alert('Use a different name.')
    }
    else{
        if(newListName.value.includes(' ') || newListName.value === '') {
            alert(`Don't use spaces.`)
        }
        else{
            let bodyObj = {
                name: newListName.value
            }
            axios.post('http://localhost:4005/grocery_lists', bodyObj)
            .then(() => {
                displayLists()
                newListName.value = ''
            })
        }
    }
}

const deleteList = (list_id) => {
    const listName = document.getElementById(`${list_id}name`).innerText
    axios.delete(`http://localhost:4005/grocery_lists/${list_id}`, {data: {name: listName }})
    .then(() => {
        displayLists()
    })
}


const addToList = () => {
    const listName = document.querySelector(`#list${listSelect.value}`).text
    axios.put(`http://localhost:4005/grocery/${grocerySelect.value}`, {data: {name: listName}})
    .then(() => {
        displayLists()
    })
}



addNewListBtn.addEventListener('click', (event) => {
    event.preventDefault()
    createNewList()

})

addToListBtn.addEventListener('click', (event) => {
    event.preventDefault()
    addToList()
})





getGroceries()
getLists()
displayLists()