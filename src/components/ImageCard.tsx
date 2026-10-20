import { ExternalLink } from "lucide-react";
import type { UnsplashPhoto } from "../types/unsplash";

interface ImageCardProps {
  photo: UnsplashPhoto;
}

export function ImageCard({ photo }: ImageCardProps) {
  const description = photo.alt_description || photo.description || "Unsplash photograph";

  return (
    <article className="image-card">
      <a
        className="image-link"
        href={photo.links.html}
        target="_blank"
        rel="noreferrer"
        aria-label={`View photo: ${description}`}
      >
        <img
          src={photo.urls.regular}
          alt={description}
          loading="lazy"
          style={{ backgroundColor: photo.color || "#e2e8f0" }}
        />
        <span className="image-open-icon" aria-hidden="true"><ExternalLink size={17} /></span>
      </a>
      <div className="image-card-footer">
        <p className="image-description" title={description}>{description}</p>
        <a
          className="photographer"
          href={photo.user.links.html}
          target="_blank"
          rel="noreferrer"
        >
          Photo by {photo.user.name}
        </a>
      </div>
    </article>
  );
}
