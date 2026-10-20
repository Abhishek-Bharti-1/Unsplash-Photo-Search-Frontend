export function LoadingGrid() {
  return (
    <div className="image-grid" aria-label="Loading photos" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className={`skeleton-image skeleton-${index % 4}`} />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}
