export interface LocationModalProps {
  onClose: () => void;
  open: boolean;
  addNewLocation: (location: INewLocation) => void;
}

export interface INewLocation {
  status: string;
  name: string;
  address: string;
}
