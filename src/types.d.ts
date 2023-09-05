type Weather = {
  description: string;
  icon: string;
};

export type Data = {
  id: number;
  name: string;
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
};

export type Location = {
  id: string;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
};
