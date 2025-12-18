import Actualise from "./components/HomePageComponents/Actualise";
import Footer from "./components/footer/Footer";
import RentabilisezBys from "./components/HomePageComponents/RentabilisezBys";
import NewWaySection from "./components/HomePageComponents/landingpageComponent/page";
import CarRentalHero from "./components/HomePageComponents/page_rentaal/CarRentalHero";
import "./globals.css";
import ProductList from "./components/HomePageComponents/ProductList";
import VillesMaroc from "./components/HomePageComponents/location/VillesMaroc";
import { LensDemo } from "./components/LensDemo";



export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <CarRentalHero />
      <NewWaySection/>
            <VillesMaroc />
      <RentabilisezBys />
      <ProductList />

      <Actualise />
    
   
    </div>
  );
}