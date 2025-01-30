export interface Student{
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tel: number | null;
  date_naissance: Date | string;
  filiere: string;
}
