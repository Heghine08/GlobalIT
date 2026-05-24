import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const menu = [
    {
      name: "Chicken shawarma with lavash",
      price: "1000 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Flavash.jpg&w=384&q=75",
    },
    {
      name: "Chicken shawarma with bread",
      price: "500 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Fhachav.jpg&w=384&q=75",
    },
    {
      name: "Beef kebab",
      price: "800 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Ftavarkebab.jpeg&w=384&q=75",
    },
    {
      name: "Ikki-bir",
      price: "1000 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Fiqibir.jpeg&w=384&q=75",
    },
    {
      name: "Grill",
      price: "2000 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Fgrill.jpeg&w=384&q=75",
    },
    {
      name: "Hot dog",
      price: "350 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Fhotdog.jpg&w=384&q=75",
    },
    {
      name: "Chicken kebab",
      price: "700 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Fhavkebab.jpeg&w=384&q=75",
    },
    {
      name: "Tan 0.5l",
      price: "300 դրամ",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fmenu%2Ftan.png&w=384&q=75",
    },
  ];

  return (
    <div className="menu">
      <h1 className="title">Մենյու</h1>

      <div className="cards">
        {menu.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;