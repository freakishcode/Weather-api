// Minimal shape mappers — keeps components clean and resilient.
export const toCurrentShape = (raw) => ({
  city: raw?.name ?? "",
  country: raw?.sys?.country ?? "",
  temp: Math.round(raw?.main?.temp ?? 0),
  feels: Math.round(raw?.main?.feels_like ?? 0),
  desc: raw?.weather?.[0]?.description ?? "",
  icon: raw?.weather?.[0]?.icon ?? "",
  humidity: raw?.main?.humidity ?? 0,
  wind: Math.round(raw?.wind?.speed ?? 0),
});

export const toForecastItems = (raw) =>
  (raw?.list ?? []).map((x) => ({
    dt: x.dt * 1000,
    hour: new Date(x.dt * 1000).toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(x?.main?.temp ?? 0),
    desc: x?.weather?.[0]?.description ?? "",
    icon: x?.weather?.[0]?.icon ?? "",
  }));
