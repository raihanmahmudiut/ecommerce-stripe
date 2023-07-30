import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { productsArray } from "../productsstore";
import { CartContext } from "../CartContext";
import { useContext } from "react";

export const ProductCard = (productsArray) => {
	const product = productsArray.product;
	const cart = useContext(CartContext);
	const productQuantity = cart.getProductQuantity(product.id);
	console.log(cart.items);
	// prop.product is the porduct we are selling
	return (
		<Card>
			<Card.Body>
				<Card.Title>{product.title}</Card.Title>
				<Card.Text>${product.price}</Card.Text>
				{productQuantity > 0 ? (
					<>
						<Form as={Row}>
							<Form.Label column="true" sm="6">
								In cart: {productQuantity}
							</Form.Label>
							<Col>
								<Button
									sm="6"
									className="mx-2"
									onClick={() => cart.addOneToCart(product.id)}
								>
									+
								</Button>
								<Button
									sm="6"
									className="mx-2"
									onClick={() => cart.removeOneFromCart(product.id)}
								>
									-
								</Button>
							</Col>
						</Form>
						<Button
							variant="danger"
							onClick={() => cart.deleteFromCart(product.id)}
							className="my-2"
						>
							Remove from cart
						</Button>
					</>
				) : (
					<Button
						variant="primary"
						onClick={() => cart.addOneToCart(product.id)}
					>
						Add to cart
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};
