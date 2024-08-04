import { useContext, useEffect, useState } from "react";
import { Context } from "../context";

function Main({ selectedBrand }) {
  const { state, dispatch } = useContext(Context);
  const { products } = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const api = selectedBrand
        ? `https://headphones-server.onrender.com/products?brand_name=${selectedBrand}`
        : `https://headphones-server.onrender.com/products`;

      try {
        const response = await fetch(api);
        const data = await response.json();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedBrand]);
  return (
    <div className="main">
      <div className="as">MAIN</div>
      <h3>Products</h3>
      {loading && <div>Loading...</div>}
      <ul className="products">
        {products.map((product) => (
          <li className="product-card" key={product.id}>
            <img src={product.image_url} alt={product.name} />
            <p>{product.name}</p>
            <h4>{product.brand_name}</h4>
            <div>{product.color_options}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
