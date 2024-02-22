import { type ICountry } from '@/app/core/interfaces';
import { countries } from '@/app/shared/data';

export async function getCountries(): Promise<ICountry[]> {
  // Simulate call api
  try {
    const data = await new Promise<ICountry[]>((resolve, reject) => {
      resolve(countries);
    });
    return data;
  } catch (error) {
    return [];
  }
}
