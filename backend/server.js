const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const app = express();

app.use(express.json());
app.use(cors());

//rotta di prova
app.get('/api/test', (req, res) => {
  console.log('Test rotta raggiunta');
  res.send('Test riuscito!');
});


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant_app';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connesso a MongoDB'))
.catch(err => console.error('❌ Errore di connessione a MongoDB:', err));


// Rotta di registrazione
const bcrypt = require('bcryptjs');

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Per favore, inserisci tutti i campi' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Utente già esistente' });
  }

  // Cifra la password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'Registrazione completata con successo' });
});



// Rotta di login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Utente non trovato' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Password errata' });
  }

  res.json({ message: 'Login effettuato con successo' });
});

const PORT = process.env.PORT || 5000;
console.log('📡 Server in ascolto su:', `http://localhost:${PORT}`);
app.listen(PORT, () => console.log(`🚀 Server in esecuzione sulla porta ${PORT}`));
