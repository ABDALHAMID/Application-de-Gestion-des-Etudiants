// routes/students.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const Student = require('./student');

const studentTable = 'etudiant'

// Get all students
router.get('/', (req, res) => {
  console.log("get student list");
  db.query(`SELECT * FROM ${studentTable}`, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a student by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM ${studentTable} WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Create a new student
router.post('/', (req, res) => {
  console.log("inserting")
  console.log(req.body)
  const student = new Student(
    null,
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.matricule,
    req.body.tel,
    req.body.date_naissance,
    req.body.filiere
  );

  db.query(`INSERT INTO ${studentTable} SET ?`, student, (err, result) => {
    console.log(result)
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: result.insertId, ...student });
      console.log("laskdjf inserted")
    }
  });
});

// Update a student by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const student = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    matricule: req.body.matricule,
    tel: req.body.tel,
    date_naissance: req.body.date_naissance,
    filiere: req.body.filiere,
  };

  db.query(`UPDATE ${studentTable} SET ? WHERE id = ?`, [student, id], (err) => {
    if (err) {
      console.error('Error updating student:', err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ id, ...student });
      console.log()
    }
  });
});

// Delete a student by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM ${studentTable} WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: err });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
