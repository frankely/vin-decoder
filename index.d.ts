type VinRawInfo = {
  madeIn: string;
  manufacturer: string;
  details: string;
  securityCode: string;
  year: string;
  assemblyPlant: string;
  serialNumber: string;
};

type VinDecodedCarInfo = {
  country: string;
  serialNumber: string;
  manufacturer: string;
  modelYear: Array<string>;
};

declare module "vin-decoder" {
  export function validate(vin: string, checksumParam?: string): boolean;

  export function split(vin: string): VinRawInfo;
  export function decode(): VinDecodedCarInfo;
}
