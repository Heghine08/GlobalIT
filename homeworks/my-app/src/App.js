import ProductCard from "./components/ProductCard";
import ProfileCard from "./components/ProfileCard";

function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 1000,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung S23",
      price: 900,
      category: "Electronics",
      inStock: false,
    },
    {
      id: 3,
      name: "MacBook Air",
      price: 1200,
      category: "Laptops",
      inStock: true,
    },
    {
      id: 4,
      name: "AirPods Pro",
      price: 250,
      category: "Accessories",
      inStock: true,
    },
    {
      id: 5,
      name: "Sony Headphones",
      price: 350,
      category: "Accessories",
      inStock: false,
    },
  ];

  return (
    <div>
      <h1>Ապրանքների ցուցակ</h1>
      <div style={{ display: "flex"}}>
        {products.map((product) => (
          <ProductCard
            name={product.name}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
          />
        ))}
      </div>

      <h2>Օգտատերերի պրոֆիլներ</h2>
      <ProfileCard
        name="Արմեն Ավագյան"
        avatar="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"
        bio="React Developer"
        followers={1500}
      />
    </div>
  );
}
export default App;
