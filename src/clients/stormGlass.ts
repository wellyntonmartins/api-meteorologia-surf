import { AxiosStatic } from 'axios';

export class StormGlass {
  constructor(protected request: AxiosStatic) {}

  readonly stormGlassApiParams =
    'swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed';
  readonly stormGlassApiSource = 'noaa';

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return await this.request.get(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassApiParams}&source=${this.stormGlassApiSource}&lat=${lat}.7984&lng=${lng}`,
      {
        params: {
          Authorization:
            '584a841a-b863-11f1-9cea-0242ac120004-584a84ec-b863-11f1-9cea-0242ac120004',
        },
      }
    );
  }
}
