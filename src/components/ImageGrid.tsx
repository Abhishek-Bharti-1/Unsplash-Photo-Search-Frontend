import type { UnsplashPhoto } from "../types/unsplash";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  photos: UnsplashPhoto[];
}

export function ImageGrid({ photos }: ImageGridProps) {
  return (
    <div className="image-grid">
      {photos.map((photo) => <ImageCard key={photo.id} photo={photo} />)}
    </div>
  );
}
