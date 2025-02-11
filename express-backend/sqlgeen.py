import random
import string

# Constants for data generation
FIRST_NAMES = [
    "Abdelhamid", "Youssef", "Hassan", "Fatima", "Mohammed", "Salma", "Karim", "Nadia", "Ali", "Khadija",
    "Imane", "Yassin", "Noureddine", "Loubna", "Adil", "Amina", "Anas", "Soukaina", "Redouane", "Fatima-Zahra",
    "Omar", "Sara", "Ahmed", "Meryem", "Rachid", "Nora", "Samir", "Amal", "Mustapha", "Zineb",
    "Khalid", "Latifa", "Ismail", "Hind", "Fouad", "Naima", "Tarik", "Asmae", "Younes", "Najat",
    "Walid", "Safia", "Driss", "Jihad", "Abderrahman", "Hajar", "Aziz", "Sanae", "Hakim", "Maryam",
    "Abdelkader", "Inès", "Mohamed", "Chaimae", "Hassane", "Nour", "Abdelaziz", "Widad", "Abdeljalil", "Lamia",
    "Hamza", "Naima", "Anass", "Fatima-Ezzahra", "Ayoub", "Rabia", "Mehdi", "Fatima-Elhouda", "Yahya", "Salwa"
]

LAST_NAMES = [
    "Boulaajoul", "El Amrani", "Zerouali", "Benjelloun", "Rkaini", "Laraki", "Ouazghour", "Chakir", "Achbani", "Bakkali",
    "Moutaouakil", "Bennani", "Sbiti", "Hajji", "Azizi", "El Kettani", "Joundi", "Tahiri", "Mernissi", "El Idrissi",
    "Guerrouj", "Essakali", "Bouhdida", "Zniber", "El Ouardi", "El Alj", "El Ouazzani", "El Khattabi", "El Abbassi", "El Fassi",
    "El Kettani", "El Guerrouj", "El Rhazi", "El Yousfi", "El Alaoui", "El Houcine", "El Moutaouakil", "El Amrani", "El Aoufi", "El Bakkali",
    "El Bennani", "El Chakir", "El Zerouali", "El Achbani", "El Rkaini", "El Laraki", "El Ouazghour", "El Sbiti", "El Hajji", "El Azizi"
]

FIELDS_OF_STUDY = [
    "Génie Informatique", "Génie Civil", "Génie Electrique", "Génie Mécanique", "Ingénierie Biomédicale",
    "Génie Industriel", "Ingénierie Alimentaire"
]

def generate_phone_number():
    return f"0{random.randint(600000000, 699999999)}"

def generate_matricule():
    return f"etu-{random.randint(10, 9999)}"

def generate_birth_date():
    year = random.randint(2000, 2003)
    month = random.randint(1, 12)
    day = random.randint(1, 28)  # Simplified to avoid date issues
    return f"{year}-{month:02d}-{day:02d}"

def generate_email(first_name, last_name):
    return f"{first_name.lower()}.{last_name.lower()}@e-polytechnique.ma"

# Generate 100 rows of data
rows = [(
    "BOULAAJOUL",
        "ABDELHAMID",
        "ABDELHAMID.BOULAAJOUL@e-polytechnique.ma",
        "etu-00",
        "0631479410",
        "2003-09-21",
        "Génie Informatique"
)]
for _ in range(100):
    repet = True
    first_name = ''
    last_name= ''
    matricule= ''
    phone_number= ''
    while repet:
        repet = False
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        matricule = generate_matricule()
        phone_number = generate_phone_number()
        if _ == 0:
            repet = False
        for r in rows:
            if (first_name == r[1] and last_name == r[0]) or matricule == r[3] or phone_number == r[4]:
                repet = True
                break
        
    email = generate_email(first_name.replace(" ", ""), last_name.replace(" ", ""))
    birth_date = generate_birth_date()
    field_of_study = random.choice(FIELDS_OF_STUDY)

    row = (
        last_name,
        first_name,
        email,
        matricule,
        phone_number,
        birth_date,
        field_of_study
    )
    rows.append(row)

# Generate SQL INSERT statement
sql_inserts = []
for row in rows:
    sql_inserts.append(
        f"('{row[0]}', '{row[1]}', '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}')"
    )

sql_script = "INSERT INTO etudiant (nom, prenom, email, matricule, tel, date_naissance, filiere) VALUES\n" + ",\n".join(sql_inserts) + ";"

# Print or save the SQL script
print(sql_script)

# Optionally, save to a file
with open("students.sql", "w", encoding="utf-8") as file:
    file.write(sql_script)

print("SQL script generated and saved to 'students.sql'.")