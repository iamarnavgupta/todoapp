import React, { useState, useEffect } from "react";

const NoteModal = ({ closeModal, saveNote, currentNote }) => {  
    // ✅ Initialize state with currentNote values (for editing)
    const [title, setTitle] = useState(currentNote ? currentNote.title : "");
    const [description, setDescription] = useState(currentNote ? currentNote.description : "");

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setDescription(currentNote.description);
        }
    }, [currentNote]); // ✅ Re-run when currentNote changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        saveNote(title, description);  // ✅ Correct function call
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {currentNote ? "Edit Note" : "Add New Note"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="border p-2 w-full mb-4"
                        required
                    />

                    {/* Description Input */}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Note Description"
                        className="border p-2 w-full mb-4 h-24"
                        required
                    />

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button 
                            type="button" 
                            onClick={closeModal}  
                            className="mt-4 text-red-500"
                        >
                            Cancel
                        </button>

                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                           {currentNote ? "Update Note" : "Add Note"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
