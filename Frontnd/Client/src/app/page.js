import Actualise from "./components/Actualise";
import Footer from "./components/Footer";
import RentabilisezBys from "./components/RentabilisezBys";
import NewWaySection from "./landingpageComponent/page";
import CarRentalHero from "./page_rentaal/CarRentalHero";
import "./globals.css";
import Card from "./components/Card";
import { properties } from "./constants/data";

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <CarRentalHero />
      <NewWaySection/>
      <RentabilisezBys />
      <div className="properties">
        {properties.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
      <Actualise />
     
    </div>
  );
}