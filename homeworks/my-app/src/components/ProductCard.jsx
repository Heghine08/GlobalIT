const ProductCard = ({ name, price, category, inStock }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{name}</h3>
      <p>Գինը: {price} $</p>
      <p>Կատեգորիա: {category}</p>

      {inStock ? (
        <button style={{ backgroundColor: "green", color: "white", border:"none", padding:"5px"}}>
          Buy Now
        </button>
      ) : (
        <p style={{ color: "red" }}>Out of Stock</p>
      )}
    </div>
  );
};
export default ProductCard;
