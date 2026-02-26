import { galleryImages } from "./galleryImages";

const Gallery = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Hospital Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;