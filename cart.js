/* Rendering goods from cart */
function renderCart() {
	const cartContainer = document.getElementById('cart-items');
	const totalItemsElement = document.getElementById('total-items');
	const totalPriceElement = document.getElementById('total-price');
	cartContainer.innerHTML = ''; /* Cleaning cart */

	/* Recieving datas of cart */
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	let totalItems = 0;
	let totalPrice = 0;

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty.</p>";
		totalItemsElement.textContent = "";
		totalPriceElement.textContent = "";
		return;
	}

	cart.forEach((item, index) => {
		/* Recieving the price with symbol of currency, for example - "£39.99" */
		const priceWithSymbol = item[3] || "£0.00";
		
		/* Extract symbol of currency and integer meaning */
		const currencySymbol = priceWithSymbol.trim()[0];
		const price = parseFloat(priceWithSymbol.trim().slice(1)); /* Cleaning symbol and recreate it in integer */

		if (isNaN(price)) {
			console.error(`Invalid price for item at index ${index}:`, priceWithSymbol);
			return;
		}

		const quantity = item.quantity || 1; /* If havent quantity, then just install - 1 */
		const itemTotal = price * quantity; /* Summary cost of product */

		/* Increase general meanings */
		totalItems += quantity;
		totalPrice += itemTotal;

		/* Creating the element of product */
		const itemDiv = document.createElement('div');
		itemDiv.classList.add('cart-item');
		itemDiv.innerHTML = `
			<h4>${item[0]}</h4>
			<div style="display: flex; align-items: center;">
				<img class="cart-item-image" src="${item[4]}" alt="${item[0]}" style="width: 75px; height: 75px; margin-right: 10px;">
				<div class="cart-item-info">
					<p>${item[1]}</p>
					<p><strong>Price:</strong> ${currencySymbol}${price.toFixed(2)}</p>
					<p><strong>Quantity:</strong> ${quantity}</p>
					<p><strong>Total:</strong> ${currencySymbol}${itemTotal.toFixed(2)}</p>
				</div>
			</div>
			<button onclick="removeFromCart(${index})">Remove</button>
		`;
		cartContainer.appendChild(itemDiv);
	});

	/* Displaying general meanings */
	totalItemsElement.textContent = `Total Items: ${totalItems}`;
	totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
}

/* Removing product from cart */
function removeFromCart(index) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	cart.splice(index, 1); /* Removing element by index */
	localStorage.setItem('cart', JSON.stringify(cart)); /* Saving changes */
	renderCart(); /* Updating the cart */
}

/* Loading cart when loads the pages */
window.onload = renderCart;