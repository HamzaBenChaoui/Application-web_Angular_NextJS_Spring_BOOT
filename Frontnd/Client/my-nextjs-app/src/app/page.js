import RentabilisezBys from "./components/RentabilisezBys";
import NewWaySection from "./landingpageComponent/page";
import CarRentalHero from "./page_rentaal/CarRentalHero";
export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <CarRentalHero />
   
      <NewWaySection/>
        <RentabilisezBys />
    </div>
  );
}
