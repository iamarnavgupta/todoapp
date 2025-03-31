import React from "react";//import react library to our javascript

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold mt-10">Welcome to Dashboard</h1>

            {/* ✅ Floating "Add Note" Button */}
            <button
                className="fixed right-4 bottom-4 text-3xl bg-teal-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-teal-600 transition"
                onClick={() => console.log("Add Note Clicked!")} 
            >
                +
            </button>
        </div>
    );
};

export default Dashboard;
