import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, onDelete }) => {  
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.description}</p>

            <div className="flex justify-end mt-2">
                {/* ✅ Fixed Edit Button */}
                <button className="text-blue-500 mr-2" onClick={onEdit}>
                    <FaEdit />
                </button>

                {/* ✅ Fixed Delete Button */}
                <button className="text-red-500" onClick={onDelete}>  
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
