import { Weather } from '@modules/graphql/@generated/graphql';
import WeatherCard from '@modules/weather/components/card/weather-card';
import React from 'react';

type DashboardWeatherForecastProps = {
  weatherForecast: Weather[];
};

const DashboardWeatherForecast: React.FC<DashboardWeatherForecastProps> = (props) => {
  const { weatherForecast } = props;

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">Weather Forecast</h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {weatherForecast.map((forecast, index) => {
          return <WeatherCard key={`weather-${String(index)}`} weather={forecast} />;
        })}
      </div>
    </div>
  );
};

export default DashboardWeatherForecast;