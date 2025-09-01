# Weather App — React Query + Material UI

This app shows current weather and a 5‑day forecast using OpenWeatherMap. It
uses Axios + @tanstack/react-query for data fetching/caching and Material UI for
UI.

1. **Install**

```bash
npm install
```

2. **Add your API key** in `src/api/weatherClient.js`:

```js
const API_KEY = "REPLACE_WITH_YOUR_OPENWEATHERMAP_KEY";
```

3. **Run**

```bash
npm run dev
```

## Features

- Split, optimized file structure.
- React Query caching (`staleTime` current: 5m, forecast: 10m), `retry: 1`,
  disabled refetch on focus.
- Loading skeletons & error states.
- Units toggle (°C/°F).
- Search by city + country code (e.g., `Lagos, NG`, `London, GB`).

## Why not `.env`?

Per request, the key is in the code file. Be aware that client‑side keys can be
extracted from the JS bundle.

## Build

```bash
npm run build && npm run preview
```
