// src/components/gallery/galleryImages.ts
export const galleryImages = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/${i + 1}.jpg`,
  alt: `Hospital ${i + 1}`,
}));