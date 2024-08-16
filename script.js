// Sample data for cart items, recommendations, and product information
const itemImages = [
    'walmrt.jpg'
];


const cartItems = [
    { name: 'Amul Milk', price: 29.99 },
    { name: 'Britannia Bread', price: 12.49 },
    { name: 'Eggs', price: 10.19 },
];

const recommendations = [
    { name: 'Amul Butter', price: 50.49 },
    { name: 'Amul Cheese', price: 60.99 },
    { name: 'Go Cheese', price: 86.89 },
];

const shoppingList = [
    'Real Orange Juice',
    'Cucumbers',
    'Olive Oil',
];

// Predefined product information
const productInfo = {
    'Milk': { expiryDate: '2024-Sep-01', type: 'Veg', allergies: ['Lactose'] },
    'Bread': { expiryDate: '2024-Aug-25', type: 'Vegan', allergies: ['Gluten'] },
    'Eggs': { expiryDate: '2024-Sep-05', type: 'Non-Veg', allergies: ['None'] },
    'Parle-G': { expiryDate: '2024-Aug-20', type: 'Veg', allergies: ['Contains Milk, Wheat, and is made in a facility that process peanuts, tree nuts, soy, dairy, and wheat ingredients.'] },
};

let currentItemIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const nextItemButton = document.getElementById('next-item-button');
    const itemImage = document.getElementById('item-image');
    const aiMessageElement = document.getElementById('ai-message');

    // Handle the "Next Item" button click
    nextItemButton.addEventListener('click', () => {
        aiMessageElement.textContent = 'Navigating to the next item [Real Orange Juice]...';
        currentItemIndex = (currentItemIndex + 1) % itemImages.length;
        itemImage.src = itemImages[currentItemIndex];
        itemImage.style.display = 'block'; // Show the image
    });
});

// Cart Summary and Recommendations (index.html)
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (cartItemsList && totalPriceElement) {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} : Rs. ${item.price.toFixed(2)}`;
            cartItemsList.appendChild(listItem);

            totalPrice += item.price;
        });

        totalPriceElement.textContent = `Rs. ${totalPrice.toFixed(2)}`;
    }

    const recommendItemsList = document.getElementById('recommend-items');
    if (recommendItemsList) {
        recommendItemsList.innerHTML = '';

        recommendations.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} : Rs. ${item.price.toFixed(2)}`;
            recommendItemsList.appendChild(listItem);
        });
    }
}

// Display product information (index.html)
function displayProductInfo(productName) {
    const productDetailsElement = document.getElementById('product-details');
    if (productDetailsElement) {
        const info = productInfo[productName];
        if (info) {
            productDetailsElement.innerHTML = `
                <strong>Name:</strong> ${productName}<br>
                <strong>Expiry Date:</strong> ${info.expiryDate}<br>
                <strong>Type:</strong> ${info.type}<br>
                <strong>Allergens:</strong> ${info.allergies.join(', ')}
            `;
        } else {
            productDetailsElement.textContent = 'No information available for this product.';
        }
    }
}

// Initialize camera feed and handle product detection
function setupCamera() {
    const video = document.getElementById('video');
    const captureMessage = document.getElementById('capture-message');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.error("Error accessing the camera: ", error);
                captureMessage.textContent = "Unable to access the camera.";
            });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // Simulate product detection
            const detectedProduct = 'Parle-G'; // Example detected product
            const product = { name: detectedProduct, price: 3.99 }; 
            cartItems.push(product);
            updateCart();
            captureMessage.textContent = `${detectedProduct} has been added to your cart for Rs. ${product.price.toFixed(2)}.`;
            displayProductInfo(detectedProduct);
        }
    });

    document.addEventListener('ontouchend', (event) => {
        // Prevent default behavior (e.g., scrolling) if needed
        event.preventDefault();
        const detectedProduct = 'Parle-G'; // Example detected product
        const product = { name: detectedProduct, price: 3.99 }; 
        cartItems.push(product);
        updateCart();
        captureMessage.textContent = `${detectedProduct} has been added to your cart for Rs. ${product.price.toFixed(2)}.`;
        displayProductInfo(detectedProduct);
    });
}

// AI Assistant Navigation (navigation.html)
function setupNavigation() {
    const navigateBtn = document.getElementById('navigate-btn');
    const aiMessageElement = document.getElementById('ai-message');
    if (navigateBtn && aiMessageElement) {
        navigateBtn.addEventListener('click', () => {
            aiMessageElement.textContent = 'Navigating to the next item [Real Orange Juice]...';
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    setupCamera();
    setupNavigation();
    updateShoppingList();
});
