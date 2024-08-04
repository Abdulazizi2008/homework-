import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";

function Aside({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
}) {
  const { state, dispatch } = useContext(Context);
  const { colors, brands } = state;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchColors() {
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "SET_COLORS", payload: data });
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchBrands() {
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "SET_BRANDS", payload: data });
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchColors();
    fetchBrands();
  }, []);

  return (
    <div className="aside">
      <div className="as">ASIDE</div>
      <h3>Brands</h3>
      {loading && <div>Loading...</div>}
      <ul className="brand-wrapper">
        {brands.map((brand, index) => (
          <li key={index}>
            <input
              type="radio"
              id={brand}
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
      </ul>
      <button className="btn" onClick={() => setSelectedBrand("")}>
        reset
      </button>
      <h3>Colors</h3>
      {loading && <div>Loading...</div>}
      <ul className="color-wrapper">
        {colors.map((color, index) => {
          return (
            <li key={index}>
              <button
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  border: "1px solid",
                  borderRadius: "50%",
                  cursor: "pointer",
                  outlineOffset: "1px",
                  outline: selectedColor === color ? `2px solid ${color}` : "",
                }}
              ></button>
            </li>
          );
        })}
      </ul>
      <button className="btn" onClick={() => setSelectedColor("")}>
        reset
      </button>
    </div>
  );
}

export default Aside;
