import { useEffect, useRef, useState } from "react";
import { searchPhotos, UnsplashApiError } from "../services/unsplash";
import type { UnsplashPhoto } from "../types/unsplash";

export type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

interface PhotoSearchState {
  photos: UnsplashPhoto[];
  total: number;
  page: number;
  totalPages: number;
  status: SearchStatus;
  error: string | null;
  submittedQuery: string;
}

export function usePhotoSearch() {
  const [state, setState] = useState<PhotoSearchState>({
    photos: [],
    total: 0,
    page: 1,
    totalPages: 0,
    status: "idle",
    error: null,
    submittedQuery: "",
  });
  const activeController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => activeController.current?.abort();
  }, []);

  async function search(query: string, page = 1) {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;

    setState({
      photos: [],
      total: 0,
      page,
      totalPages: 0,
      status: "loading",
      error: null,
      submittedQuery: normalizedQuery,
    });

    try {
      const result = await searchPhotos(normalizedQuery, page, controller.signal);
      if (controller.signal.aborted) return;
      setState({
        photos: result.results,
        total: result.total,
        page,
        totalPages: result.total_pages,
        status: result.results.length > 0 ? "success" : "empty",
        error: null,
        submittedQuery: normalizedQuery,
      });
    } catch (error) {
      if (controller.signal.aborted) return;
      const message =
        error instanceof UnsplashApiError
          ? error.message
          : "Something went wrong. Please try again.";
      setState({
        photos: [],
        total: 0,
        page,
        totalPages: 0,
        status: "error",
        error: message,
        submittedQuery: normalizedQuery,
      });
    }
  }

  return { ...state, search, goToPage: (page: number) => search(state.submittedQuery, page) };
}
