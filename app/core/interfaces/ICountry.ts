export interface ICountry {
  name: Name;
  capital: string[];
  flags: IFlag;
}

interface IFlag {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}
