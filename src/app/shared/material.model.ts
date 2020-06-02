export class Material {
  name: String;
  lastupdated: String;
  creator: String;
  id: number;
  material: number;
}

export class MaterialForm {
  name: String;
  lastupdated: String;
  creator: String;
  id: number;
}

export class ResponseData {
  fileName: string;
  lastupdated: string;
  creator: string;
  id: number;
  description: string;
  fileDownloadUri: string;
  fileType: string;
}

export class ResponseForm {
  file: File;
  description: string;
  creator: string;
}
