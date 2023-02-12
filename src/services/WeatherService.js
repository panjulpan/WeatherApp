import {Client} from '../../api';

const WeatherService = {
  getWeatherByCity: async city => {
    return await Client.get(
      `data/2.5/forecast?q=${city}&appid=fe01587e8bbe76c3ff7ceeab5f218c1d&units=metric&lang=id`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
};

export {WeatherService};
