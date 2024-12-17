const categories = { hoodies, jumpers, tshirts };

function renderProducts(category) {
	const productContainer = document.getElementById("product-list");
	productContainer.innerHTML = ''; // clear the list

	const selectedCategories = category === 'all' ? Object.keys(categories) : [category];

	selectedCategories.forEach(cat => {
		categories[cat].forEach((product, index) => {
			const productElement = document.createElement("div");
			productElement.classList.add("product");

			productElement.innerHTML = `
				<img src="${product[4]}" alt="${product[0]}" />
				<h3>${product[0]}</h3>
				<p>${product[2]}</p>
				<p><strong>Price:</strong> ${product[3]}</p>
				<button onclick="goToProductPage('${cat}', ${index})">More Details</button>
				<button onclick="addToCart('${cat}', ${index})">Add to Cart</button>
			`;
			productContainer.appendChild(productElement);
		});
	});
}

/* Filter by category */
function filterProducts(category) {
	renderProducts(category);
}

/* Go to product page */
function goToProductPage(category, index) {
	const product = categories[category][index];
	sessionStorage.setItem("currentProduct", JSON.stringify(product));
	window.location.href = "item.html";
}

/* Adding to cart */
function addToCart(category, index) {
	const product = categories[category][index];
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	
	

	/* finding product in cart */
	const existing = cart.find(item => item[0] === product[0]);

	if (existing) {
		existing.quantity = (existing.quantity || 1) + 1; /* Increase the quantity */
	} else {
		cart.push({ ...product, quantity: 1 }); /* Adding product with quantity - 1 */
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	alert(`${product[0]} successfully added to cart!`);
}

/* Rendering of all products when the page loads */
window.onload = () => renderProducts('all');