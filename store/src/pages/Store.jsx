import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productsstore";
import { ProductCard } from "../components/Productcard";

function Store() {
	return (
		<>
			<h1 align="center" className="p-3">
				Welcome to the Store
			</h1>
			<Row xs={1} md={3} className="g-4">
				{productsArray.map((product, idx) => (
					<Col align="center" key={idx}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</>
	);
}

export default Store;
