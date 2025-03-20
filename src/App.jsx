import React, { useState, useEffect } from 'react';
import { db } from './firebaseconfig';  // Importa la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [itemToUpdate, setItemToUpdate] = useState({ id: '', name: '' });

  // Función para crear un nuevo item
  const addItem = async () => {
    if (newItem.trim()) {
      try {
        await addDoc(collection(db, 'items'), {
          name: newItem
        });
        setNewItem(""); // Limpiar el input
        fetchItems(); // Recargar los items
      } catch (e) {
        console.error("Error añadiendo documento: ", e);
      }
    }
  };

  // Función para leer los items de Firestore
  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
    } catch (e) {
      console.error("Error obteniendo documentos: ", e);
    }
  };

  // Función para actualizar un item
  const updateItem = async () => {
    if (itemToUpdate.name.trim()) {
      try {
        const itemRef = doc(db, 'items', itemToUpdate.id);
        await updateDoc(itemRef, {
          name: itemToUpdate.name
        });
        setItemToUpdate({ id: '', name: '' }); // Limpiar los datos
        fetchItems(); // Recargar los items
      } catch (e) {
        console.error("Error actualizando documento: ", e);
      }
    }
  };

  // Función para eliminar un item
  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, 'items', id);
      await deleteDoc(itemRef);
      fetchItems(); // Recargar los items
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  };

  useEffect(() => {
    fetchItems(); // Cargar los items cuando se monte el componente
  }, []);

  return (
    <div className="App">
      <h1>CRUD con Firestore</h1>

      {/* Crear nuevo item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Nuevo Item"
      />
      <button onClick={addItem}>Añadir</button>

      {/* Listado de items */}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => setItemToUpdate({ id: item.id, name: item.name })}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Actualizar un item */}
      {itemToUpdate.id && (
        <div>
          <h3>Actualizar Item</h3>
          <input
            type="text"
            value={itemToUpdate.name}
            onChange={(e) => setItemToUpdate({ ...itemToUpdate, name: e.target.value })}
            placeholder="Nombre del item"
          />
          <button onClick={updateItem}>Actualizar</button>
        </div>
      )}
    </div>
  );
}

export default App;