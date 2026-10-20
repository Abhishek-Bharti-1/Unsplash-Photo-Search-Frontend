import { Image, Search } from "lucide-react";

interface EmptyStateProps {
  type: "initial" | "no-results";
  query?: string;
}

export function EmptyState({ type, query }: EmptyStateProps) {
  if (type === "no-results") {
    return (
      <section className="state-panel" aria-live="polite">
        <span className="state-icon"><Image size={27} /></span>
        <h2>No photos found</h2>
        <p>We couldn’t find photos for <strong>“{query}”</strong>. Try a different search term.</p>
      </section>
    );
  }

  return (
    <section className="state-panel initial-state" aria-live="polite">
      <span className="state-icon"><Search size={27} /></span>
      <h2>Search any term to view images</h2>
      <p>Discover beautiful photos from creators around the world.</p>
    </section>
  );
}
