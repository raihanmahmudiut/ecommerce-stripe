//Loafer: price_1NZbOfHodGWw1oB97JIybIyt
//Socks: price_1NZbPxHodGWw1oB93hxAJtln
// Boots: price_1NZbQnHodGWw1oB9uG8iw3K3

const productsArray = [
	{
		id: "price_1NZbOfHodGWw1oB97JIybIyt",
		title: "Loafer",
		price: 29.99,
	},
	{
		id: "price_1NZbPxHodGWw1oB93hxAJtln",
		title: "Socks",
		price: 9.99,
	},
	{
		id: "price_1NZbQnHodGWw1oB9uG8iw3K3",
		title: "Boots",
		price: 49.99,
	},
];

function getProductData(id) {
	let productData = productsArray.find((product) => product.id === id);

	if (productData == undefined) {
		console.log("Product data does not exist");
		return undefined;
	}
	return productData;
}

export { productsArray, getProductData };
