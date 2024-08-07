import React, { useState } from "react";

function Heder({ selectPrice, setSelectPrice }) {
  return (
    <header>
      <a href="#" className="logo">
        LOGO
      </a>
      <select
        name="price"
        value={selectPrice}
        onChange={(e) => setSelectPrice(e.target.value)}
      >
        <option value="">none</option>
        <option value="cheap">cheap</option>
        <option value="expensive">expensive</option>
      </select>
    </header>
  );
}

export default Heder;
