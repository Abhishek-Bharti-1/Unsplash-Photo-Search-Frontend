import type { UnsplashSearchResponse } from "../types/unsplash";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class UnsplashApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "UnsplashApiError";
  }
}

export async function searchPhotos(
  query: string,
  page: number,
  signal?: AbortSignal,
): Promise<UnsplashSearchResponse> {

  const photosPerPage = 48;
  const apiPageSize = 30;
  const startIndex = (page - 1) * photosPerPage;
  const firstApiPage = Math.floor(startIndex / apiPageSize) + 1;
  const startOffset = startIndex % apiPageSize;
  const apiPagesNeeded = Math.ceil((startOffset + photosPerPage) / apiPageSize);

  async function fetchPage(apiPage: number): Promise<UnsplashSearchResponse> {
    const params = new URLSearchParams({
      query,
      page: String(apiPage),
      perPage: String(apiPageSize),
      orderBy: "relevant",
      // content_filter: "high",
    });

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/search/photos?${params.toString()}`, {
        signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      throw new UnsplashApiError("Network error. Check your connection and try again.");
    }

    if (!response.ok) {
      if (response.status === 400) {
        throw new UnsplashApiError(
          "Invalid search parameters. Please check your query and try again.",
          response.status,
        );
      }
      if (response.status === 429) {
        throw new UnsplashApiError(
          "Backend rate limit reached. Please wait a little and try again.",
          response.status,
        );
      }
      throw new UnsplashApiError(
        `Backend request failed (${response.text.toString()}). Please try again.`,
        response.status,
      );
    }

    return (await response.json()) as UnsplashSearchResponse;
  }

  const responses = await Promise.all(
    Array.from({ length: apiPagesNeeded }, (_, index) => fetchPage(firstApiPage + index)),
  );
  const results = responses.flatMap((response) => response.results);
  const firstResponse = responses[0];

  return {
    total: firstResponse.total,
    total_pages: Math.ceil(firstResponse.total / photosPerPage),
    results: results.slice(startOffset, startOffset + photosPerPage),
  };
}
