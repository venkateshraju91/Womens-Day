interface PhotoImage {
  src: string
  alt: string
  name?: string
  designation?: string
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
          {img.name && (
            <div className="photo-caption">
              <span className="photo-name">{img.name}</span>
              {img.designation && <span className="photo-designation">{img.designation}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
