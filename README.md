# Angular Portfolio Frontend

Angular 20 standalone frontend for Harsh Vishwakarma's portfolio. It requires the FastAPI backend at `http://localhost:8000/api/v1`.

## Development

```powershell
npm install
npm start
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

Start the backend separately from `../backend` with `python -m uvicorn app.main:app --reload --port 8000`. Change API and production site URLs in `src/app/core/config/environment.ts` before deployment.

## Content and assets

Backend project records reference files under `assets/images/projects/<project-slug>/`. Real screenshots are organized for AWS Native Services Platform, Amazon Q Cost Analytics Assistant and Documentation Module; the supplied SVG is used for Distributed Multi-Drone AI Tracking. AWS Cost Calculator and Air Pollution Prediction intentionally use the reusable visual fallback because no matching source images were provided. Add verified images to those public directories and gallery JSON when available.

The copied resume is available at `public/assets/documents/Harsh_Vishwakarma_Resume.pdf` and is linked from the navbar, hero and footer. Replace it at the same path when a newer verified resume is available. Replace `public/favicon.ico` and add manifest icons before publishing.

## Browser-local interactions

Likes use keys namespaced by application and project slug. Comments contain a locally generated ID, display name, message, and timestamps. Both stay only in the visitor's `localStorage`; they are not globally shared and other visitors cannot see them. Project feedback is separate: it is sent only after explicit submission to the FastAPI feedback endpoint, which forwards it through configured SMTP without storing it.

The theme defaults from the visitor's system preference on first use and persists locally. Dark and light palettes share semantic CSS variables.

## Production checklist

- Replace `example.com` in the environment, canonical metadata, `robots.txt`, `sitemap.xml`, and JSON-LD.
- Replace profile link routes in backend JSON with verified URLs.
- Add screenshots, the real resume, favicon and manifest icons.
- Configure the backend's allowed frontend origin and SMTP environment values.
- Serve the Angular build with SPA route fallback to `index.html`.
