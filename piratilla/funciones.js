let cart = JSON.parse(localStorage.getItem('brsky_cart') || '[]');
const cartItemsList = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.getElementById('cart-count');

// Escuchar clicks en botones de añadir
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    // Verificar si ya existe para aumentar cantidad
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    updateUI();
}

function removeFromCart(id) {
    const existingItem = cart.find(item => item.id === id);
    if (!existingItem) return;

    if (existingItem.quantity > 1) {
        existingItem.quantity--;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
    updateUI();
}

function saveCart() {
    localStorage.setItem('brsky_cart', JSON.stringify(cart));
}

function updateUI() {
    if (!cartItemsList) return; // por si el script corre en una página sin carrito visible

    // Limpiar lista
    cartItemsList.innerHTML = '';

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" data-id="${item.id}" title="Quitar uno">✕</button>
        `;
        cartItemsList.appendChild(li);

        total += item.price * item.quantity;
        count += item.quantity;
    });

    totalPriceEl.textContent = total.toFixed(2);
    if (cartCountEl) cartCountEl.textContent = count;

    // Conectar los botones de quitar recién creados
    cartItemsList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFromCart(e.target.getAttribute('data-id'));
        });
    });
}

// Vaciar carrito
const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        cart = [];
        saveCart();
        updateUI();
    });
}

function volver() {
    window.location.href = "tienda.html";
}

// Mostrar el estado del carrito apenas carga la página
updateUI();
