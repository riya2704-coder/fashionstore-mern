import express from 'express';
import dbconnect from './Configure/DB.js';
import AuthRoutes from './Routes/AuthRoutes.js'
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "http://localhost:5175",   // React frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Middleware to parse JSON (Correct way)
app.use(express.json());

// Use Auth route (Correct way)
app.use('/api/auth', AuthRoutes);

const port = 8080;

// Connect DB and start server
dbconnect().then(()=>{
    app.listen(port, () =>{
      console.log(`Server running on port ${port}`)
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});