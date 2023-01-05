export interface ILocation {
  id: string;
  name?: string;
  tenant: string;
  status: string;
  managingOrganization: string;
  alias: string;
  description: string;
  type: string;
  address: string;
  npi: string;
  taxId: string;
  partOf: string;
  updatedAt: number;
  telecom: ITelecom[];
}

export interface ITelecom {
  rank: number;
  system: string;
  use: string;
  value: string;
}
