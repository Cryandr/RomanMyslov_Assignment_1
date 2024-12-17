function toggleMenu() {
	var nav = document.querySelector('.myNav');
	nav.classList.toggle('active');
}

function renderItem() {
	/* Recieving datas of product from sessionStorage */
	const product = JSON.parse(sessionStorage.getItem("currentProduct"));

	if (!product) {
		document.getElementById("item-container").innerHTML = "<p>Product not found.</p>";
		return;
	}

	/* Displayed the datas of product */
	document.getElementById("item-container").innerHTML = `
		<div class="item-details">
			<img class="item-image" src="${product[4]}" alt="${product[0]}" />
			<div class="item-info">
				<h1>${product[0]}</h1>
				<p>${product[2]}</p>
				<p><strong>Price:</strong> ${product[3]}</p>
				<button onclick="addToCart()">Add to Cart</button>
				<button onclick="window.location.href='products.html';">Back to lobby</button>
			</div>
		</div>
	`;
}

function addToCart() {
	/* Recieving current product from sessionStorage */
	const product = JSON.parse(sessionStorage.getItem("currentProduct"));
	
	

	if (!product) {
		alert("Error: Product data is missing.");
		return;
	}

	/* Loading the cart in localStorage */
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	/* finding product in cart */
	const existing = cart.find(item => item[0] === product[0]);

	if (existing) {
		/* If product in cart already, then increase the quantity */
		existing.quantity = (existing.quantity || 1) + 1;
	} else {
		/* But if not, then just push product with quantity 1 */
		cart.push({ ...product, quantity: 1 });
	}

	/* Saving cart back in localStorage */
	localStorage.setItem('cart', JSON.stringify(cart));
	alert(`${product[0]} successfully added to cart!`);
}

/* Rendering of product when the pages loads */
window.onload = renderItem;