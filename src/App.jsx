import { useState, useMemo, useEffect } from "react";
import "./App.css";

// Import MUI
import {
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";

// Import theme factory
import { getTheme } from "./theme.js";

// Importing components
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import ForecastList from "./components/ForecastList.jsx";
import { useCurrentWeather } from "./hooks/useCurrentWeather.js";
import { useForecast } from "./hooks/useForecast.js";
import { UNITS } from "./api/weatherClient.js";

export default function App() {
  const [city, setCity] = useState("Lagos, NG");
  const [units, setUnits] = useState(UNITS.metric);

  // 🔹 Detect system dark mode
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // 🔹 Load theme from localStorage OR system preference
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) return saved; // use saved preference
    return prefersDark ? "dark" : "light"; // fallback to system preference
  });

  // 🔹 Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const current = useCurrentWeather(city, units);
  const forecast = useForecast(city, units);

  const title = useMemo(
    () => (city ? `Weather in ${city}` : "Weather"),
    [city]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline maxWidth='sm' sx={{ py: 4 }} />
      <Container maxWidth='sm' sx={{ py: 4 }}>
        <Stack gap={2}>
          {/* Title + Theme Toggle */}
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='h4' fontWeight={800} textAlign='center'>
              {title}
            </Typography>

            {/* 🔹 Tooltip for theme toggle */}
            <Tooltip
              title={
                mode === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              <IconButton onClick={toggleTheme} color='inherit'>
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Search bar */}
          <SearchBar onSearch={setCity} defaultCity={city} />

          {/* Toggle for units */}
          <ToggleButtonGroup
            value={units}
            exclusive
            onChange={(_, v) => v && setUnits(v)}
            sx={{ alignSelf: "center" }}
            size='small'
          >
            <ToggleButton value={UNITS.metric}>Metric (°C)</ToggleButton>
            <ToggleButton value={UNITS.imperial}>Imperial (°F)</ToggleButton>
          </ToggleButtonGroup>

          {/* Current weather */}
          <WeatherCard
            data={current.data}
            units={units}
            isLoading={current.isPending}
            isError={current.isError}
            error={current.error}
          />

          {/* Forecast */}
          <ForecastList
            items={forecast.data}
            units={units}
            isLoading={forecast.isPending}
            isError={forecast.isError}
            error={forecast.error}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
