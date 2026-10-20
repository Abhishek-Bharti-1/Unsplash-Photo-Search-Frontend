import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="state-panel" role="alert">
      <span className="state-icon error-icon"><AlertCircle size={27} /></span>
      <h2>We couldn’t load the photos</h2>
      <p>{message}</p>
      <button className="retry-button" type="button" onClick={onRetry}>
        <RotateCcw size={16} /> Try again
      </button>
    </section>
  );
}
