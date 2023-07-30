import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./cartProduct";

function NavbarComponent() {
	const [show, setShow] = useState(false);

	const handleclose = () => setShow(false);
	const handleshow = () => setShow(true);
	const cart = useContext(CartContext);

	const checkout = async () => {
		await fetch("http://localhost:4000/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ items: cart.items }),
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.url) {
					window.location.assign(response.url); // Forwarding user to Stripe
				}
			});
	};

	const productsCount = cart.items.reduce(
		(sum, product) => sum + product.quantity,
		0
	);

	return (
		<>
			<Navbar expand="sm">
				<Navbar.Brand href="/">Flyheel Footwear</Navbar.Brand>

				<Navbar.Toggle />

				<Navbar.Collapse className="justify-content-end">
					<Button onClick={handleshow}>Cart {productsCount} Items</Button>
				</Navbar.Collapse>
			</Navbar>
			<Modal show={show} onHide={handleclose}>
				<Modal.Header closeButton>
					<Modal.Title>Shopping Cart</Modal.Title>
					<Modal.Body>
						{productsCount > 0 ? (
							<>
								<p>Items in your cart</p>
								{cart.items.map((currentProduct, idx) => (
									<CartProduct
										key={idx}
										id={currentProduct.id}
										quantity={currentProduct.quantity}
									></CartProduct>
								))}
								<h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

								<Button variant="success" onClick={checkout}>
									Purchase Items!
								</Button>
							</>
						) : (
							<h1>NO items in your cart</h1>
						)}
					</Modal.Body>
				</Modal.Header>
			</Modal>
		</>
	);
}

export default NavbarComponent;
