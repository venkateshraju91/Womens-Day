interface PhotoBannerProps {
  images: { src: string; alt: string }[]
}

export default function PhotoBanner({ images }: PhotoBannerProps) {
  return (
    <div className="photo-banner">
      {images.map((img, i) => (
        <div key={i} className="photo-frame">
          <img src={img.src} alt={img.alt} className="photo-img" />
        </div>
      ))}
    </div>
  )
}
