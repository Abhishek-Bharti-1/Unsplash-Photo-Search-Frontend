import { Camera, Sparkles, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { ImageGrid } from "./components/ImageGrid";
import { LoadingGrid } from "./components/LoadingGrid";
import { SearchForm } from "./components/SearchForm";
import { usePhotoSearch } from "./hooks/usePhotoSearch";

function App() {
  const { photos, total, page, totalPages, status, error, submittedQuery, search, goToPage } = usePhotoSearch();
  const [healthStatus, setHealthStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [healthMessage, setHealthMessage] = useState<string>("");

  const checkHealth = async () => {
    setHealthStatus("loading");
    setHealthMessage("");
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/health`);
      if (!res.ok) {
        throw new Error(`Health check failed (${res.status})`);
      }
      const data = await res.json();
      setHealthStatus("success");
      setHealthMessage(`Backend OK (${data.timestamp || new Date().toLocaleTimeString()})`);
    } catch (err: any) {
      setHealthStatus("error");
      setHealthMessage(err.message || "Backend offline");
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Unsplash Explorer home">
          <span className="brand-mark"><Camera size={20} strokeWidth={2.2} /></span>
          <span>Unsplash<span className="brand-light"> Explorer</span></span>
        </a>
        <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div className="health-check-container" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={checkHealth}
              disabled={healthStatus === "loading"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                background: "white",
                color: "var(--ink)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s"
              }}
            >
              {healthStatus === "loading" ? (
                <span className="button-spinner" />
              ) : (
                <Activity size={14} style={{ color: "var(--green)" }} />
              )}
              <span>Health Check</span>
            </button>
            {healthStatus === "success" && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#176b50", fontWeight: 600 }}>
                <CheckCircle2 size={13} /> {healthMessage}
              </span>
            )}
            {healthStatus === "error" && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#b4533c", fontWeight: 600 }}>
                <AlertCircle size={13} /> {healthMessage}
              </span>
            )}
          </div>
          <span className="powered-by"><span className="status-dot" /> Powered by Unsplash</span>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={14} /> A world of inspiration</div>
        <h1>Find your next<br /><span>favorite image.</span></h1>
        <p className="hero-copy">Explore a universe of photography. One search can take you anywhere.</p>
        <SearchForm isLoading={status === "loading"} onSearch={search} />
        <p className="search-hint">Search by subject, mood, place, color, or idea.</p>
      </section>

      <section className="results-section" aria-live="polite">
        {status === "success" && (
          <div className="results-heading">
            <div>
              <p className="section-kicker">YOUR DISCOVERY</p>
              <h2>Results for <span>“{submittedQuery}”</span></h2>
            </div>
            <div className="results-meta">
              <span className="result-count">{total.toLocaleString()} photos</span>
              <span className="page-count">Page {page} of {totalPages}</span>
            </div>
          </div>
        )}

        {status === "idle" && <EmptyState type="initial" />}
        {status === "loading" && (
          <>
            <div className="loading-label"><span className="inline-spinner" /> Finding photos for “{submittedQuery}”</div>
            <LoadingGrid />
          </>
        )}
        {status === "success" && (
          <>
            <ImageGrid photos={photos} />
            {totalPages > 1 && (
              <nav className="pagination" aria-label="Search result pages">
                <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span aria-live="polite">Page {page} of {totalPages}</span>
                <button type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                  Next
                </button>
              </nav>
            )}
          </>
        )}
        {status === "empty" && <EmptyState type="no-results" query={submittedQuery} />}
        {status === "error" && (
          <ErrorState message={error || "An unexpected error occurred."} onRetry={() => search(submittedQuery, page)} />
        )}
      </section>

      <footer className="footer">
        <span>Made for curious minds.</span>
        <span>Photos provided by <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a></span>
      </footer>
    </main>
  );
}

export default App;
