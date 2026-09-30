import { AxiosStatic } from 'axios';

// Cria-se essa interface para definir um tipo reutilizavel facilmente em outros lugares
export interface StormGlassPointSource {
  [key: string]: number;
}

// Outra interface para atribuir os tipos das variaveis que vao ser referenciadas em @StormGlassForecastResponse
export interface StormGlassPoint {
  readonly time: string;
  readonly waveHeight: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

// Interface que consome e atribui as variaveis de StormGlassPoint para o atributo especifico de "hours"
export interface StormGlassForecastsResponse {
  hours: StormGlassPoint[];
}

// Interface para ser usada como validacao dos dados da API externa
export interface ForecastPoint {
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  time: string;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}

// Classe que gerencia os dados da API
export class StormGlass {
  constructor(protected request: AxiosStatic) {}

  // Parametros para fazer uma requisicao especifica na API externa
  readonly stormGlassApiParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassApiSource = 'noaa';

  // Funcao que resgata os dados da API
  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const response = await this.request.get<StormGlassForecastsResponse>(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassApiParams}&source=${this.stormGlassApiSource}&end=1592113802&lat=${lat}&lng=${lng}`,
      {
        params: {
          Authorization:
            '584a841a-b863-11f1-9cea-0242ac120004-584a84ec-b863-11f1-9cea-0242ac120004',
        },
      }
    );

    // Retorna esses dados normalizados
    return this.normalizeResponse(response.data);
  }

  // Normaliza os dados vindos da API (remove o que nao e necessario e padroniza-os)
  private normalizeResponse(
    points: StormGlassForecastsResponse
  ): ForecastPoint[] {
    // Retorna apenas os dados validos e padronizados com seu conteudo atribuido ao seu nome, e nao terceirizado pelo sub-parametro comum 'noaa'
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      swellDirection: point.swellDirection[this.stormGlassApiSource],
      swellHeight: point.swellHeight[this.stormGlassApiSource],
      swellPeriod: point.swellPeriod[this.stormGlassApiSource],
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassApiSource],
      waveHeight: point.waveHeight[this.stormGlassApiSource],
      windDirection: point.windDirection[this.stormGlassApiSource],
      windSpeed: point.windSpeed[this.stormGlassApiSource],
    }));
  }

  // Verifica se os dados da API batem com os tipos de StormGlassPoint
  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassApiSource] &&
      point.swellHeight?.[this.stormGlassApiSource] &&
      point.swellPeriod?.[this.stormGlassApiSource] &&
      point.waveDirection?.[this.stormGlassApiSource] &&
      point.waveHeight?.[this.stormGlassApiSource] &&
      point.windDirection?.[this.stormGlassApiSource] &&
      point.windSpeed?.[this.stormGlassApiSource]
    );
  }
}
