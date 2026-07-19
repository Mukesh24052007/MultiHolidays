type ImageGridItem = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

type Props = {
  images: ImageGridItem[];
};

export default function ImageGrid({ images }: Props) {
  return (
    <section className="mb-xl grid grid-cols-1 md:grid-cols-2 gap-md">
      {images.map((img, i) => (
        <div key={i} className="h-64 rounded-xl overflow-hidden relative group">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
            <h5 className="text-white font-headline-md text-headline-md">{img.title}</h5>
            <p className="text-white/80 text-label-md font-label-md">{img.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
