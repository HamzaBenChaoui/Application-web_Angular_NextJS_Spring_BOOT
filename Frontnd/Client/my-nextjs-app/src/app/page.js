import NewWaySection from "./landingpageComponent/page";

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
      <p className="text-lg">This is your frontend-only Next.js app with a navbar.</p>

      <NewWaySection/>
    </div>
  );
}
