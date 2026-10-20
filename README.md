# Unsplash Explorer

A React + TypeScript photo search app powered by the official Unsplash API. Built with Vite and Tailwind CSS.

## Requirements

- Node.js 18+ (Node.js 20 LTS recommended)
- An Unsplash developer Access Key

## Setup

1. Extract the project ZIP and open the folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file by copying `.env.example` to `.env.local`.

   **Windows PowerShell**
   ```powershell
   Copy-Item .env.example .env.local
   ```

   **macOS/Linux**
   ```bash
   cp .env.example .env.local
   ```

4. In `.env.local`, replace `your_unsplash_access_key` with your Unsplash Access Key.
   Create/manage an application at https://unsplash.com/developers.

5. Start the dev server:

   ```bash
   npm run dev
   ```

6. Open the local URL Vite prints (usually http://localhost:5173).

## Useful scripts

- `npm run dev` — start local development server
- `npm run typecheck` — check TypeScript
- `npm run build` — type-check and create production build
- `npm run preview` — preview the production build

## Architecture

```text
src/
├── components/
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── ImageCard.tsx
│   ├── ImageGrid.tsx
│   ├── LoadingGrid.tsx
│   └── SearchForm.tsx
├── hooks/
│   └── usePhotoSearch.ts
├── services/
│   └── unsplash.ts
├── types/
│   └── unsplash.ts
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Notes

- The app does not request images on initial load. It starts with the search prompt.
- A submitted search replaces the prior results.
- Images are displayed from the `urls` supplied by Unsplash and include photographer attribution.
- `VITE_UNSPLASH_ACCESS_KEY` is included in client-side code by Vite. Do not treat it as a secret. For a public production deployment, put the Unsplash API call behind a server/serverless endpoint if you need to keep the key private.
- Follow Unsplash API terms and guidelines: https://unsplash.com/documentation and https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
