import { IConfig } from '@modules/config/config.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, lastValueFrom } from 'rxjs';
import { WeatherForecastInput } from './dto/get-weather-forecast.input';
import {
  WeatherForecastApiResponse,
  WEATHER_API_TYPE_MAPPING,
} from './lib/weather-lib';
import { Weather } from './models/weather.model';
import { WeatherForecastResponse } from './responses/weather-forecast.response';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async getWeatherForecast(
    input: WeatherForecastInput,
  ): Promise<WeatherForecastResponse> {
    try {
      const forecastDays = 8;
      const baseApi = this.configService.get('weather', {
        infer: true,
      }).api;

      const dailyParams = [
        'weathercode',
        'temperature_2m_max',
        'temperature_2m_min',
        'uv_index_max',
        'precipitation_sum',
        'windspeed_10m_max',
        'winddirection_10m_dominant',
      ];

      const params = {
        latitude: String(input.latitude),
        longitude: String(input.longitude),
        models: 'best_match',
        past_days: String(1),
      };

      const searchParams = new URLSearchParams(params).toString();

      const completeUrl = `${baseApi}?${searchParams}&daily=${dailyParams.join(
        ',',
      )}&timezone=America%2FSao_Paulo`;

      const request = this.httpService
        .get<WeatherForecastApiResponse>(completeUrl)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );

      const forecast = await lastValueFrom(request);
      const dataEntries = Object.entries(forecast.daily);

      const weatherForecast: Weather[] = [];

      for (let i = 0; i < forecastDays; i++) {
        const forecastEntry: Weather = {
          precipitationSum: 0,
          temperatureMax: 0,
          temperatureMin: 0,
          time: '0',
          uvIndexMax: 0,
          weatherCode: 0,
          windDirectionDominant: 0,
          windSpeedMax: 0,
        };

        dataEntries.forEach((entry) => {
          const [key, data] = entry;
          const mappedKey = WEATHER_API_TYPE_MAPPING[key];
          forecastEntry[mappedKey] = data[i];
        });
        weatherForecast.push(forecastEntry);
      }

      return { forecast: weatherForecast };
    } catch (err) {}
  }
}
