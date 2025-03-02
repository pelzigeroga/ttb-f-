import { useState, useEffect } from "react";
import axios from "axios";

export default function Trainingstagebuch() {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({ datum: "", uebung: "", gewicht: "", wiederholungen: "", benutzer: "Benutzer1" });

    // Ändere diese URL auf deine Render-Backend-URL!
    const API_URL = "https://deinbackend.onrender.com/api/training";

    useEffect(() => {
        axios.get(API_URL, { params: { benutzer: form.benutzer } })
            .then((res) => setEntries(res.data))
            .catch((err) => console.error("Fehler beim Laden der Daten:", err));
    }, [form.benutzer]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL, form)
            .then((res) => {
                setEntries([...entries, res.data]);
                setForm({ ...form, datum: "", uebung: "", gewicht: "", wiederholungen: "" });
            })
            .catch((err) => console.error("Fehler beim Speichern:", err));
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Trainingstagebuch</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input type="date" name="datum" value={form.datum} onChange={handleChange} className="border p-2 w-full" required />
                <input type="text" name="uebung" placeholder="Übung" value={form.uebung} onChange={handleChange} className="border p-2 w-full" required />
                <input type="number" name="gewicht" placeholder="Gewicht (kg)" value={form.gewicht} onChange={handleChange} className="border p-2 w-full" required />
                <input type="number" name="wiederholungen" placeholder="Wiederholungen" value={form.wiederholungen} onChange={handleChange} className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Eintrag speichern</button>
            </form>
            <h2 className="text-xl font-bold mt-6">Einträge</h2>
            <ul className="mt-2">
                {entries.map((entry) => (
                    <li key={entry.id} className="border p-2 my-2">
                        {entry.datum} - {entry.uebung}: {entry.gewicht}kg x {entry.wiederholungen}
                    </li>
                ))}
            </ul>
        </div>
    );
}
