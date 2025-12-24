import { useState, useEffect } from 'react';
import './App.css';
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'

import AuthForm from './AuthForm';

function App() {
  // ---------------- STATE ----------------
  const [showForm, setShowForm] = useState(false);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newDescription, setNewDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const [docs, setDocs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [adoptedCount, setAdoptedCount] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  const [user, setUser] = useState(null);


  // ---------------- HELPERS ----------------
  const fetchDogImage = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  };

  // ---------------- READ FROM FIRESTORE ----------------
  const fetchAllFields = async () => {
    try {
      const colRef = collection(db, "petapp");
      const snapshot = await getDocs(colRef);

      const allDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocs(allDocs);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFields();
  }, []);

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  },[]);

  // ---------------- ADD PET HANDLER ----------------
  const handleAddPet = async (e) => {
    e.preventDefault();

    if (
      !newName.trim() ||
      !newType.trim() ||
      newAge <= 0 ||
      !newDescription.trim()
    ) {
      return;
    }

    setSaving(true);

    try {
      let imageUrl =
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e";

      if (newType.toLowerCase() === "dog") {
        imageUrl = await fetchDogImage();
      }

      const newPet = {
        name: newName.trim(),
        type: newType.trim(),
        age: Number(newAge),
        description: newDescription.trim(),
        image: imageUrl,
        adopted: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "petapp"), newPet);

      // reset form
      setNewName('');
      setNewType('');
      setNewAge(0);
      setNewDescription('');
      setShowForm(false);

      // refresh list
      fetchAllFields();
    } catch (err) {
      console.error("Error adding pet:", err);
    } finally {
      setSaving(false);
    }
  };

  // ---------------- EARLY RETURNS ----------------
  if (loading) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Error</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // ---------------- JSX ----------------
 

  return (
    <div className="container">

       {!user ? (
    <AuthForm/>
  ): (
    <p>Welcome, {user.email}</p>
  )}

      <h1>Adopt a Pet 🐾</h1>
      <h2>Total Pets Adopted: {adoptedCount}</h2>

      <ul>
        {docs.map((item) => (
          <li key={item.id}>
            {item.name} the {item.type}

            <button className="bio" onClick={() => setSelectedPet(item)}>
              View Bio
            </button>

            <button
              className="adopt"
              onClick={() => setAdoptedCount(adoptedCount + 1)}
            >
              Adopt
            </button>
          </li>
        ))}
      </ul>

      {selectedPet && (
        <div className="pet-card">
          <img src={selectedPet.image} alt={selectedPet.name} className="pet-image" />
          <h3>{selectedPet.name}</h3>

          <p>
            <strong>Age:</strong>{" "}
            {selectedPet.age === 1
              ? "1 year"
              : `${selectedPet.age} years`}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedPet.adopted ? "Adopted 🏠" : "Available 🐾"}
          </p>

          <button className="close" onClick={() => setSelectedPet(null)}>
            Close
          </button>
        </div>
      )}

      {user &&(
      <button className="new-pets" onClick={() => setShowForm(true)}>
        Pet for Adoption
      </button>
      )}

      {showForm && (
        <form onSubmit={handleAddPet}>
          <input
            placeholder="Pet Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            placeholder="Pet Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />

          <input
            type="number"
            placeholder="Pet Age"
            value={newAge}
            onChange={(e) => setNewAge(Number(e.target.value))}
          />

          <input
            placeholder="Describe your pet..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Pet"}
          </button>

          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
