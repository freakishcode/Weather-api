// Importing necessary libraries and components
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Skeleton,
} from "@mui/material";

// Importing utility function to get unit symbols
import { symbolFor } from "../Utility/units";
import motion from "framer-motion";

// WeatherCard component to display current weather information
// It accepts data, units, loading state, error state, and error message as props
export default function WeatherCard({
  data,
  units,
  isLoading,
  isError,
  error,
}) {
  // If the data is still loading, show a skeleton loader
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant='text' width={180} />
          <Skeleton variant='text' width={120} />
          <Skeleton variant='rounded' height={60} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  // If there is an error, display the error message
  if (isError) {
    return (
      <Card>
        <CardContent>
          <Typography color='error' variant='body1'>
            {error?.message || "Failed to load weather"}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // If no data is available, return null to avoid rendering an empty card
  if (!data) return null;

  // Destructure the data object to extract necessary properties
  const unitSymbol = symbolFor(units);

  return (
    <motion.div
      key={data.id || data.dt} // ensures animation on new city/weather
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {/* Display the city and country name, and weather description */}
            <Stack>
              <Typography variant='h5' fontWeight={700}>
                {data.city}, {data.country}
              </Typography>
              <Typography variant='body2' sx={{ textTransform: "capitalize" }}>
                {data.desc}
              </Typography>
            </Stack>

            {/* Display the weather icon if available */}
            {data.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.desc}
                width={64}
                height={64}
                loading='lazy'
              />
            )}
          </Stack>

          {/* Display the temperature with the appropriate unit symbol */}
          <Typography variant='h2' mt={1}>
            {data.temp}
            {unitSymbol}
          </Typography>

          {/* Display additional weather information such as feels like, humidity, and wind speed */}
          <Stack direction='row' gap={1} mt={1} flexWrap='wrap'>
            <Chip label={`Feels like ${data.feels}${unitSymbol}`} />
            <Chip label={`Humidity ${data.humidity}%`} />
            <Chip
              label={`Wind ${data.wind}${
                units === "imperial" ? " mph" : " m/s"
              }`}
            />
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
