export interface AppExeption {
  error_message: string;
  explanation?: string;
  code: number;
  method?: string;
  obj?: any;
}

export interface DeletedData {
  id: string;
  collection: string;
  message: string;
  time: string;
}

export interface UserInformation {
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  urlPicture: string;
  birthday: string;
  gender: string;
}

export class User {
  public id: string;
  public information?: UserInformation;
  public authStrategy?: string;
  public userType: any;
  public settings: any;

  constructor(id: string) {
    this.id = id;
  }
}
