class Student {
    constructor(id, nom, prenom, email, matricule, tel, date_naissance, filiere) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.matricule = matricule;
      this.tel = tel;
      this.date_naissance = date_naissance;
      this.filiere = filiere;
    }
  }
  
  module.exports = Student;
  