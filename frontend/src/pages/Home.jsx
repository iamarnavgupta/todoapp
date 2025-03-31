import React, { useState, useEffect } from "react";//manages component state
import { useNavigate } from "react-router-dom";//used for programmatic navigation
import axios from "axios";//Handles HTTP requests
import NoteModal from "../components/NoteModal";//component for adding editing notes
import NoteCard from "../components/NoteCard";//component that  i created to display individual notes

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);//controls if the note modal is open or closed
    const [notes, setNotes] = useState([]);//stores all notes fetched from backend
    const [editingNote, setEditingNote] = useState(null);//stores the note object when editing an existing note
    const navigate = useNavigate();//react router hook for redirecting users
    const [user, setUser] = useState(null);//stores logged-in user details

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));//fetch users from local storage and updates user state
        setUser(storedUser);
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const token = localStorage.getItem("token");//fetching notes from backend, retreives auth token from local storage
        if (!token) {
            navigate("/login");//if no token is found , redirects to the login page
            return;
        }

        try {
            const { data } = await axios.get("http://localhost:5000/api/note", {//sends a GET request to fetch notes
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {//if the request succeeds, store notes in setNotes
                setNotes(data.notes);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            if (error.response?.status === 401) handleSessionExpired();//If the response is unauthorized (401), calls handleSessionExpired() to log the user out.
        }
    };

    const handleSessionExpired = () => {//If the token is invalid/expired, removes user data and redirects to login.
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const openModal = (note = null) => {//Opens the modal.If editing, sets editingNote to the selected note object.
        setEditingNote(note);
        setModalOpen(true);
    };

    const closeModal = () => {//Closes the modal and resets editingNote.
        setModalOpen(false);
        setEditingNote(null);
    };

    const saveNote = async (title, description) => {//Checks authentication before making a request.
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const headers = { Authorization: `Bearer ${token}` };
            let response;
            
            if (editingNote) {//If editing, sends a PUT request to update the note.
                response = await axios.put(`http://localhost:5000/api/note/${editingNote._id}`, { title, description }, { headers });
            } else {
                response = await axios.post("http://localhost:5000/api/note/add", { title, description }, { headers });//If creating, sends a POST request to add a new note.
            }

            if (response.data.success) {//If successful, refreshes the note list.
                fetchNotes();
            }
            closeModal();//Closes the modal.
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    const deleteNote = async (id) => {//Checks authentication before making a request.
        const token = localStorage.getItem("token");//The async keyword in JavaScript is used to define an asynchronous function. In your code
        if (!token) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/note/${id}`, {//Sends a DELETE request to remove the note.
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                fetchNotes();
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-center text-3xl font-bold mt-4">Welcome to Notes App</h1>
            {user && <p className="text-center text-gray-600">Logged in as: {user.name}</p>}

            <div className="mt-6 max-w-3xl mx-auto">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard 
                            key={note._id} 
                            note={note} 
                            onEdit={() => openModal(note)}
                            onDelete={() => deleteNote(note._id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No notes found.</p>
                )}
            </div>

            {user && (
                <button
                    onClick={() => openModal()}
                    className="fixed right-4 bottom-4 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition"
                >
                    +
                </button>
            )}

            {isModalOpen && (
                <NoteModal 
                    closeModal={closeModal} 
                    saveNote={saveNote} 
                    currentNote={editingNote} 
                />
            )}
        </div>
    );
};

export default Home;
