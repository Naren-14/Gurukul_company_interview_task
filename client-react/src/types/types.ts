export interface optionalClassKey {
  classNames?: string;
}
export type inputEvent = React.ChangeEvent<HTMLInputElement>;
export type mouseEvent = React.MouseEvent<HTMLElement>;
export type formEvent = React.FormEvent<HTMLFormElement>;
export type clickEvent = mouseEvent | formEvent;

export interface inputType extends optionalClassKey {
  label: string;
  inType: string;
  placeHolder: string;
  value: string | number | undefined;
  autocomplete?: string;
  cb: (event: inputEvent) => void;
}

export interface buttonType extends optionalClassKey {
  text: string;
  cb: (event: clickEvent) => void;
}

// created_at: "2023-12-18T21:01:33.703Z";
// email: "test@gmail.com";
// id: "6580b32da56b0310bfe7b42c";
// name: "naren update with time 2";
// phone: 9999999999;
// updated_at: "2023-12-18T21:03:20.401Z";
// _id: "6580b32da56b0310bfe7b42c";

export type cartDataType = {
  id: string;
  // updated_at?: string;
  // created_at: string;
  name: string;
  email: string;
  phone: string | number;
  classNames?: string;
  cb: (event: mouseEvent, name: string, id: string) => void;
};

export type userDetailType = {
  id: string;
  updated_at?: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | number;
};

export type buttonTestType = {};

export type loginType = {
  email: string | number;
  password: string;
};

export interface signupType extends loginType {
  name: string;
  phone: number | undefined | string;
  gender: string;
  social_website: string;
  city: string;
  state: string;
}

export type userType = {
  name: string;
  email: string;
  mobile: string | number;
};

export interface radioType extends buttonType {
  check: string;
}

export type checkboxType = radioType;

export interface selectBoxType extends optionalClassKey {
  text: string;
  label: string;
  cb: (event: mouseEvent, label: string) => void;
  options: string[];
}
