import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export const Animals = () => {
  const [Nombre_animal, setName] = useState("");
  const [Raza, setRaza] = useState("");
  const [Genero, setGenero] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [animals, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre_animal,
          Raza,
          Genero,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre_animal,
          Raza,
          Genero,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getAnimals();

    setName("");
    setRaza("");
    setGenero("");
    nameInput.current.focus();
  };

  const getAnimals = async () => {
    const res = await fetch(`${API}`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteAnimlas = async (id) => {
    const animalsResponse = window.confirm("Are you sure you want to delete it?");
    if (animalsResponse) {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getAnimals();
    }
  };

  const editAnimal = async (id) => {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setName(data.Nombre_animal);
    setRaza(data.Raza);
    setGenero(data.Genero);
    nameInput.current.focus();
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Nombre_animal}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="Raza"
              onChange={(e) => setRaza(e.target.value)}
              value={Raza}
              className="form-control"
              placeholder="Raza"
            />
          </div>
          <div className="form-group">
            <input
              type="Genero"
              onChange={(e) => setGenero(e.target.value)}
              value={Genero}
              className="form-control"
              placeholder="Genero"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Genero</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animals) => (
              <tr key={animals._id}>
                <td>{animals.Nombre_animal}</td>
                <td>{animals.Raza}</td>
                <td>{animals.Genero}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editAnimal(animals._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteAnimlas(animals._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
