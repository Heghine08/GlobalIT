import { NavLink } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
<div className="div1">
  
  <div className="text">
    <h1 className="h1">
      Գեղեցկությունը, համը, բույրը և <br />
      լավ տրամադրությունը հանդիպել <br />
      են հենց
    </h1>

    <h1 className="h2">Կառնուտ շաուրմայում</h1>

    <p>
      Մեր առաքելությունն է ուրախացնել ձեզ համեղ ուտեստներով և <br />
      ապահովել <span>արագ ու անվճար առաքում</span>
    </p>
    <NavLink to="/menu"><button className="button1">Պատվիրել</button></NavLink>
  </div>

  <img className = "img1" src="https://karnutshaurma.am/_next/image?url=%2Flogo512.png&w=384&q=75"/>
</div>
  );
}
export default Home;