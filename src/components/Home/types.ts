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

interface ICoverage {
  coverageRead: ICoverageRead;
  created: Date;
}

interface ICoverageRead {
  resource: ICoverageReadResource;
}

interface ICoverageReadResource {
  status: string;
}

interface IPatientRead {
  resource: IPatientReadResource;
}

interface IPatientReadResource {
  firstName: string;
  lastName: string;
}
