"use client";

export default function Example() {
  const products = [
    {
      id: 1,
      name: "Toyota Corolla",
      href: "#",
      price: "46€/jour",
      imageSrc:
        "https://img.freepik.com/photos-gratuite/velo-blanc-debout-dans-parc_1153-7319.jpg",
      imageAlt: "Toyota Corolla",
    },
    {
      id: 2,
      name: "Renault Clio",
      href: "#",
      price: "30€/jour",
      imageSrc:
        "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      imageAlt: "Renault Clio",
    },
    {
      id: 3,
      name: "Peugeot 2008",
      href: "#",
      price: "50€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Peugeot 2008",
    },
    {
      id: 4,
      name: "Renault Kangoo Express",
      href: "#",
      price: "51€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Renault Kangoo Express",
    },
    {
      id: 5,
      name: "Dacia Duster",
      href: "#",
      price: "40€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1605737710291-98fe72919667?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Dacia Duster",
    },
    {
      id: 6,
      name: "Volkswagen Golf",
      href: "#",
      price: "48€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1605737710291-98fe72919667?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Volkswagen Golf",
    },
    {
      id: 7,
      name: "BMW Série 3",
      href: "#",
      price: "85€/jour",
      imageSrc:
        "https://media.istockphoto.com/id/1420196426/fr/photo/ciel-bleu-v%C3%A9lo-isol%C3%A9-sur-fond-blanc-avec-chemin-de-coupe.webp?a=1&b=1&s=612x612&w=0&k=20&c=3ShQLIj1A3M46LWcZfTn7EwE-oIbpOTF35jfBsMled0=",
      imageAlt: "BMW Série 3",
    },
    {
      id: 8,
      name: "Mercedes Classe A",
      href: "#",
      price: "90€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Mercedes Classe A",
    },
    {
      id: 9,
      name: "Audi A3 Sportback",
      href: "#",
      price: "88€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1494375364506-901512970ad4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHYlQzMlQTlsb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Audi A3 Sportback",
    },
    {
      id: 10,
      name: "Kia Sportage",
      href: "#",
      price: "55€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8diVDMyVBOWxvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Kia Sportage",
    },
    {
      id: 11,
      name: "Hyundai Tucson",
      href: "#",
      price: "53€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8diVDMyVBOWxvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Hyundai Tucson",
    },
    {
      id: 12,
      name: "Citroën C3",
      href: "#",
      price: "33€/jour",
      imageSrc:
        "https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8diVDMyVBOWxvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Citroën C3",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Voitures disponibles</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
