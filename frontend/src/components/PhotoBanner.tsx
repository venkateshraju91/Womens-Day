interface PhotoImage {
  src: string
  alt: string
  quote?: string
}

interface PhotoBannerProps {
  images: PhotoImage[]
}

export default function PhotoBanner({ images }: PhotoBannerProps) {
  return (
    <div className="photo-banner">
      {images.map((img, i) => (
        <div key={i} className="photo-frame">
          <img src={img.src} alt={img.alt} className="photo-img" />
          {img.quote && (
            <div className="photo-caption">
              <span className="photo-quote">{img.quote}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
