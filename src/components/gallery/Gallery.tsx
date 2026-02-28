import { galleryImages } from "./galleryImages";

const Gallery = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Hospital Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <figure
              key={img.id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image with lazy loading and responsive sizes */}
              <img
                src={img.src} // default fallback image
                alt={img.alt}
                loading="lazy"
                srcSet={`
                  /gallery/${img.id}-small.webp 400w,
                  /gallery/${img.id}.webp 800w
                `}
                sizes="(max-width: 640px) 400px, 800px"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                {/* Caption (optional for future use) */}
                <figcaption className="w-full p-4 text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {/* {img.caption || img.alt} */}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;