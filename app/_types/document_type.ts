export interface IFetchDocumentType {
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataDocumentType[];
}

export interface IDataDocumentType {
  tipDoc_Nombre: string;
}
