import { Link } from "react-router-dom";
import "./Services.css"; 

function Services() {
  const services = [
    {
      name: "Հեշտ Է Պատվիրել",
      body:"Սնունդ պատվիրելը պարզապես մի քանի քայլով",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Forder.png&w=256&q=75",
    },
    {
      name: "Արագ Առաքում",
      body:"Պատվերը Ձեզ կհասնի ամենակարճ ժամկետում",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fdelivery.png&w=256&q=75",
    },
    {
      name: "Բարձր Որակ",
      body:"Միշտ Թարմ Համեղ և Բարձրորակ մթերք",
      image:
        "https://karnutshaurma.am/_next/image?url=%2Fimages%2Fquality.png&w=256&q=75",
    },
  ];
  return (
    <div className="services-container">
      <h2 className="services-title">Services</h2>

      <div className="cards">
        {services.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;