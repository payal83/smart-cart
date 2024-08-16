// Sample data for cart items, recommendations, and shopping list
const cartItems = [
    { name: 'Milk', price: 2.99 },
    { name: 'Bread', price: 1.49 },
    { name: 'Eggs', price: 3.19 },
];

const recommendations = [
    { name: 'Butter', price: 2.49 },
    { name: 'Cheese', price: 4.99 },
    { name: 'Juice', price: 3.89 },
];

const shoppingList = [
    'Tomatoes',
    'Cucumbers',
    'Olive Oil',
];

// Cart Summary and Recommendations (index.html)
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (cartItemsList && totalPriceElement) {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(listItem);

            totalPrice += item.price;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    const recommendItemsList = document.getElementById('recommend-items');
    if (recommendItemsList) {
        recommendItemsList.innerHTML = '';

        recommendations.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            recommendItemsList.appendChild(listItem);
        });
    }
}

// Simulate product detection from camera capture (index.html)
function handleCameraCapture() {
    const cameraInput = document.getElementById('camera-input');
    const captureMessage = document.getElementById('capture-message');

    if (cameraInput && captureMessage) {
        cameraInput.addEventListener('change', () => {
            const file = cameraInput.files[0];
            if (file) {
                // Simulate product detection
                const detectedProduct = { name: 'Orange Juice', price: 3.99 }; // Example detected product
                cartItems.push(detectedProduct);
                updateCart();
                captureMessage.textContent = `${detectedProduct.name} has been added to your cart for $${detectedProduct.price.toFixed(2)}.`;
            }
        });
    }
}

// AI Assistant Navigation (navigation.html)
function setupNavigation() {
    const navigateBtn = document.getElementById('navigate-btn');
    const aiMessageElement = document.getElementById('ai-message');
    if (navigateBtn && aiMessageElement) {
        navigateBtn.addEventListener('click', () => {
            aiMessageElement.textContent = 'Navigating to the next item...';
        });
    }
}

// Shopping List (shopping-list.html)
function updateShoppingList() {
    const shoppingItemsList = document.getElementById('shopping-items');
    if (shoppingItemsList) {
        shoppingItemsList.innerHTML = '';

        shoppingList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            shoppingItemsList.appendChild(listItem);
        });
    }

    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            const newItem = prompt('Enter the name of the new item:');
            if (newItem) {
                shoppingList.push(newItem);
                updateShoppingList();
            }
        });
    }
}

// Initialize the correct functionality based on the page
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    handleCameraCapture();
    setupNavigation();
    updateShoppingList();
});
