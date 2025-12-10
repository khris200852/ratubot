export interface MedicalCondition {
  titulo: string;
  definicion: string;
  sintomas: string[];
  tratamiento: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  SPEAKING = 'SPEAKING'
}