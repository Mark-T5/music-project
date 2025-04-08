import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState("");
  const [monthlyListeners, setMonthlyListeners] = useState("");
  const [genre, setGenre] = useState("");
  const [albums, setAlbums] = useState("");
  const [songs, setSongs] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch Artists from Backend
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/artists");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  // Create or Update Artist
  const handleSubmit = async (e) => {
    e.preventDefault();
    const artistData = {
      name,
      monthly_listeners: Number(monthlyListeners),
      genre,
      albums: albums.split(",").map(Number),
      songs: songs.split(",").map(Number),
    };

    try {
      if (editId) {
        // Update Artist
        await axios.put(`http://localhost:5000/api/artists/${editId}`, artistData);
      } else {
        // Create Artist
        await axios.post("http://localhost:5000/api/artists", artistData);
      }
      fetchArtists(); // Refresh artist list
      resetForm();
    } catch (error) {
      console.error("Error saving artist:", error);
    }
  };

  const deleteArtist = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/artists/${id}`);
      fetchArtists(); // Refresh list
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  // Set artist for editing
  const editArtist = (artist) => {
    setEditId(artist.id);
    setName(artist.name);
    setMonthlyListeners(artist.monthly_listeners);
    setGenre(artist.genre);
    setAlbums(artist.albums.join(","));
    setSongs(artist.songs.join(","));
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setMonthlyListeners("");
    setGenre("");
    setAlbums("");
    setSongs("");
  };

  return (
    <div className="page-container">
      <Navbar />
      <h2>Artists</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Artist Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Monthly Listeners" value={monthlyListeners} onChange={(e) => setMonthlyListeners(e.target.value)} required />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <input type="text" placeholder="Albums (comma-separated IDs)" value={albums} onChange={(e) => setAlbums(e.target.value)} />
        <input type="text" placeholder="Songs (comma-separated IDs)" value={songs} onChange={(e) => setSongs(e.target.value)} />
        <button type="submit">{editId ? "Update Artist" : "Add Artist"}</button>
        {editId && <button onClick={resetForm}>Cancel</button>}
      </form>

      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
          <p><strong>Name:</strong> {artist.name}</p>
          <p><strong>Monthly Listeners:</strong> {artist.monthly_listeners}</p>
          <p><strong>Genre:</strong> {artist.genre}</p>
          <p><strong>Albums:</strong> {artist.albums.length ? artist.albums.join(", ") : "None"}</p>
          <p><strong>Songs:</strong> {artist.songs.length ? artist.songs.join(", ") : "None"}</p>

          <button onClick={() => editArtist(artist)}>Edit</button>
          <button className="delete" onClick={() => deleteArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artist;

