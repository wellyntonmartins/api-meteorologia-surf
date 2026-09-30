import { StormGlass } from '../stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from 'test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from 'test/fixtures/stormglass_normalized_response_3_hours.json';

// Faz um Mock do Axios pra utilizar a API de forma falsa
jest.mock('axios');

describe('StormGlass client', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    // Utiliza o Axios mockado para fazer uma requisicao falsa (atribuindo um valor de retorno intencionalmente e substituindo uma possivel futura requisicao real (tanto ela quanto seu resultado que agora sera o valor presente em 'mockResolvedValue'))
    axios.get = jest
      .fn()
      .mockResolvedValue({ data: stormGlassWeather3HoursFixture });

    // Instancia um objeto StormGlass passando o axios mockado
    const stormGlass = new StormGlass(axios);

    // Chama a funcao de fetchPoints com o axios falso, ja com a requisicao feita (ou seja, a funcao vai apenas normalizar os dados, sobrescrevendo a requisicao real e o retorno real pelo definido anteriormente) e enviando latitude e longitude
    const response = await stormGlass.fetchPoints(lat, lng);

    // Realiza o teste para saber se os dados sao compativeis apos pegar os dados normalizados
    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });
});
