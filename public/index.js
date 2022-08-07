const grocerySelect = document.querySelector('#grocery-select')
const addNewListBtn = document.querySelector('#addNewListBtn')
const newListName = document.querySelector('#newListName')


const 
const getGroceries = () => {
    axios.get('http://localhost:4005/groceries')
        .then(res => {
            res.data.forEach(grocery => {
                const option = document.createElement('option')
                option.setAttribute('value', grocery[grocery_id])
                option.textContent = grocery.name
                grocerySelect.appendChild(option)
            })
        })
}

