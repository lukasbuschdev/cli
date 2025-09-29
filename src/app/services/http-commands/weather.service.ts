import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpRequestsService } from '../http-requests.service';
import { firstValueFrom } from 'rxjs';
import { typeCommand } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);

  private apiKeyPromise: Promise<string> | null = null;
  
  private getWeatherApiKey(): Promise<string> {
    if(!this.apiKeyPromise) {
      this.apiKeyPromise = firstValueFrom(this.httpRequests.http.get<{ WEATHER_API_KEY: string }>('/api/config.php')).then(cfg => {
        if(!cfg || !cfg.WEATHER_API_KEY) {
          throw new Error('Weather API key missing from config.php');
        }
        return cfg.WEATHER_API_KEY;
      });
    }
    return this.apiKeyPromise;
  }

  async weather(command: string, executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): Promise<void> {
    const tokens = command.trim().split(' ');

    if(!this.checkWeatherInput(command, tokens, executedCommands, currentPathString, scrollDown)) return;
    executedCommands.push({ command, output: '', path: currentPathString });
    this.httpRequests.isFetching = true;

    const weatherIndex = executedCommands.length - 1;
    const city = tokens.slice(1).join(' ');
    const apiKey = await this.getWeatherApiKey();
    const url = `https://api.openweathermap.org/data/2.5/weather?ngsw-bypass=true&q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    this.httpRequestWeather(executedCommands, scrollDown, url, weatherIndex);
  }

  checkWeatherInput(command: string, tokens: string[], executedCommands: typeCommand[], currentPathString: string, scrollDown: () => void): boolean {
    if(tokens.length < 2) {
      executedCommands.push({ command, output: 'weather: usage error: Location required', path: currentPathString });
      scrollDown();
      return false;
    }
    return true;
  }

  httpRequestWeather(executedCommands: typeCommand[], scrollDown: () => void, url: string, weatherIndex: number): void {
    this.httpRequests.http.get(url).subscribe(
      (response: any) => {
        const fetchOutput = `Weather in ${response.name}, ${response.sys.country}:\n\nSky:\t\t${response.weather[0].main}\nTemperature:\t${response.main.temp.toFixed(1)}°C\nHumidity:\t ${response.main.humidity}%\nPressure:\t${response.main.pressure}\nWind:\t\t${response.wind.speed.toFixed(0)}km/h FROM ${response.wind.deg}°\nVisibility:\t${response.visibility}m\nSunrise:\t${this.utils.formatTime(response.sys.sunrise, response.timezone)} AM\nSunset:\t\t${this.utils.formatTime(response.sys.sunset, response.timezone)} PM\nCoordinates:\t${this.utils.formatCoordinates(response.coord.lat, response.coord.lon)}\n`;
        executedCommands[weatherIndex].output += fetchOutput;
        this.httpRequests.isFetching = false;
        scrollDown();
      },
      error => {
        executedCommands[weatherIndex].output += `Error: ${error.message}`;
        this.httpRequests.isFetching = false;
        scrollDown();
      }
    );
  }
}
