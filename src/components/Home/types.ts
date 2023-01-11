export interface IData {
  priorAuthList: IPriorAuthList;
}

interface IPriorAuthList {
  resources: IResources[];
  pages: number;
}

export interface IResources {
  appointmentStart: Date;
  id: string;
  coverage: ICoverage[];
  patientRead: IPatientRead;
}

export interface ICoverage {
  coverageRead: ICoverageRead;
  created: Date;
}

interface ICoverageRead {
  resource: ICoverageReadResource;
}

interface ICoverageReadResource {
  id: string;
  status: string;
  groupNumber: string;
  subscriberId: string;
}

interface IPatientRead {
  resource: IPatientReadResource;
}

interface IPatientReadResource {
  firstName: string;
  lastName: string;
}
