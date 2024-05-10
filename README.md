# nextApp
# nextApp

Proiect Cloud Computing Goga Cristina Maria

1. Introducere
Aplicație de Management Financiar MERN
Această aplicație web MERN (MongoDB, Express.js, React.js, Node.js) este creată pentru a oferi utilizatorilor o modalitate simplă și eficientă de a-și gestiona finanțele personale. Aplicația permite utilizatorilor să-și monitorizeze cheltuielile și veniturile într-un mod organizat și ușor de utilizat.

Caracteristici principale

Gestionați Cheltuielile și Veniturile: Utilizatorii pot adăuga și gestiona tranzacții, inclusiv cheltuieli și venituri. Aceste tranzacții sunt organizate într-o manieră intuitivă pentru a oferi o imagine clară a situației financiare.
Monitorizarea Istoricului Tranzacțiilor: Utilizatorii pot vizualiza un istoric complet al tranzacțiilor, permițându-le să urmărească și să analizeze modul în care cheltuiește și câștigă bani în timp.
Integrare cu API-uri externe: Aplicația poate comunica cu API-uri externe pentru a obține date în timp real despre anumite monede virtuale sau alte informații financiare relevante.
Tehnologii Utilizate
Frontend: Aplicația frontend este construită folosind React.js, oferind o interfață de utilizator modernă și receptivă.
Backend: Backend-ul este dezvoltat folosind Node.js și Express.js, cu datele stocate într-o bază de date MongoDB. Această arhitectură asigură o performanță rapidă și scalabilă.

Comunicare Externă: Pentru a obține date în timp real despre anumite monede virtuale sau alte informații financiare, aplicația utilizează API-uri externe pentru a îmbogăți experiența utilizatorilor.

2. Descriere problemă
Această aplicație financiară MERN este o soluție inovatoare care îmbunătățește gestionarea finanțelor personale și oferă o perspectivă holistică asupra situației financiare a utilizatorilor. Prin intermediul ei, utilizatorii pot urmări și gestiona eficient cheltuielile și veniturile, obținând o imagine clară și detaliată a modului în care își gestionează resursele financiare. Astfel, aplicția facilitează procesul de luare a deciziilor financiare și optimizează planificarea bugetară, contribuind la simplificarea și eficientizarea administrării finanțelor personale pentru utilizatori.

3. Descriere API

API-ul acestei aplicații financiare MERN furnizează un set de endpoint-uri pentru gestionarea datelor legate de tranzacțiile financiare. Prin intermediul acestui API, utilizatorii pot adăuga, actualiza și șterge tranzacții, precum și să obțină informații relevante despre venituri, cheltuieli și economii. De asemenea, API-ul permite gestionarea notificărilor și oferă funcționalități pentru monitorizarea istoricului tranzacțiilor și a balanței financiare. Este proiectat pentru a fi ușor de utilizat și integrat în aplicații frontend, oferind o modalitate eficientă de gestionare a datelor financiare pentru utilizatori.



4. Flux de date
Exemple de request / response:

POST https://app-cloud-seven.vercel.app/

Body:

{
  type: 'income',
  date: 2023-03-06T22:00:00.000Z,
  category: 'salary',
  description: 'Salary May',
  _id: new ObjectId("663e1ddc575147999bc2fd90"),
  createdAt: 2024-05-10T13:15:08.649Z,
  updatedAt: 2024-05-10T13:15:08.649Z,
  __v: 0
}
{ id: '663e1e53575147999bc30091' }
Response:


Metode HTTP:

POST: Pentru a crea resurse noi (incomes, expenses)
GET: Pentru a obține resurse existente
PUT: Pentru a actualiza resurse existente
DELETE: Pentru a șterge resurse existente

5. Capturi de ecran






https://app-cloud-seven.vercel.app/
