const form = document.getElementById('crud-form');
const itemNameInput = document.getElementById('item-name');
const itemIdInput = document.getElementById('item-id');
const itemsList = document.getElementById('items-list');
const formButton = document.getElementById('form-button');

// Load items from local storage on startup
window.addEventListener('load', () => {
    loadItems();
    registerServiceWorker();
});

// Add or edit item on form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = itemNameInput.value;
    const itemId = itemIdInput.value;

    if (itemId) {
        updateItem(itemId, itemName);  // Edit mode
    } else {
        addItem(itemName);  // Add mode
    }
    itemNameInput.value = '';
    itemIdInput.value = '';
    formButton.textContent = 'Add Item';
});

// Add item to the list and local storage
function addItem(name) {
    const item = { name, id: Date.now() };
    let items = getItemsFromLocalStorage();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

// Update item
function updateItem(id, name) {
    let items = getItemsFromLocalStorage();
    items = items.map(item => item.id == id ? { ...item, name } : item);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

// Delete item
function deleteItem(id) {
    let items = getItemsFromLocalStorage();
    items = items.filter(item => item.id !== id);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

// Edit item (fills the form with current item data)
function editItem(id) {
    const items = getItemsFromLocalStorage();
    const item = items.find(item => item.id == id);
    if (item) {
        itemIdInput.value = item.id;
        itemNameInput.value = item.name;
        formButton.textContent = 'Update Item';
    }
}

// Load items from local storage
function loadItems() {
    renderItems();
}

// Get items from local storage
function getItemsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('items')) || [];
}

// Render items to the UI
function renderItems() {
    const items = getItemsFromLocalStorage();
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');

        // Crear un contenedor para los botones
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'item-buttons'; // Añade la clase para aplicar estilos

        // Crear los botones
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button'; // Añadir clase para estilo amarillo
        editButton.onclick = () => editItem(item.id); // Usar función de edición

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(item.id); // Usar función de eliminación

        // Añadir los botones al contenedor
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // Combinar el nombre del ítem y el contenedor de botones
        li.innerHTML = item.name; // Solo el nombre del ítem aquí
        li.appendChild(buttonContainer); // Añadir los botones al li

        itemsList.appendChild(li);
    });
}

// Register Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/sw.js').then(() => {
            console.log('Service Worker registered');
        });
    }
}
