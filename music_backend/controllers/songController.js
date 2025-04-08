const db = require("../db");

exports.getSongs = (req, res) => {
    const sql = "SELECT * FROM songs";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching songs:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};

// Add a song
exports.createSong = (req, res) => {
    const { name, release_year, album_id } = req.body;

    const sql = "INSERT INTO songs (name, release_year, album_id) VALUES (?, ?, ?)";
    db.query(sql, [name, release_year, album_id], (err, result) => {
        if (err) {
            console.error("Error inserting song:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Song added successfully", songId: result.insertId });
    });
};

// Update a song
exports.updateSong = (req, res) => {
    const { id } = req.params;
    const { name, release_year, album_id } = req.body;
  
    const sql = "UPDATE songs SET name = ?, release_year = ?, album_id = ? WHERE id = ?";
    db.query(sql, [name, release_year, album_id, id], (err, result) => {
      if (err) {
        console.error("Error updating song:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Song updated successfully" });
    });
  };

// Delete a song
exports.deleteSong = (req, res) => {
    const { id } = req.params;
    
    db.query("DELETE FROM songs WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting song:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Song deleted successfully" });
    });
};
