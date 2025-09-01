import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Skeleton,
  Grid,
} from "@mui/material";

import { symbolFor } from "../Utility/units";

export default function ForecastList({
  items,
  units,
  isLoading,
  isError,
  error,
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant='text' width={180} />
          <Stack mt={1} gap={1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant='rounded' height={36} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <Typography color='error'>
            {error?.message || "Failed to load forecast"}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!items?.length) return null;
  const unitSymbol = symbolFor(units);

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' fontWeight={700} gutterBottom>
          5‑Day / 3‑Hour Forecast
        </Typography>
        <Stack divider={<Divider flexItem />}>
          {items.slice(0, 10).map((x, idx) => (
            <Stack
              key={idx}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              py={1}
            >
              <Stack direction='row' alignItems='center' gap={1}>
                {x.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${x.icon}.png`}
                    alt={x.desc}
                    width={32}
                    height={32}
                    loading='lazy'
                  />
                )}
                <Typography sx={{ textTransform: "capitalize" }}>
                  {x.desc}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' gap={2}>
                <Typography>{x.hour}</Typography>
                <Typography fontWeight={700}>
                  {x.temp}
                  {unitSymbol}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
