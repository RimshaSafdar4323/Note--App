// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './components/Header';

// export default function LandingPage() {
//   const [selectedOption, setSelectedOption] = useState('');
//   const navigate = useNavigate();

//   return (
//     <div>
//       <Header/>

//       <nav className="bg-[#F7F7F7] flex justify-center py-[16px] flex-wrap px-2 gap-[40px] min-h-[60px]">
//         <div>
//           <input
//             type="text"
//             placeholder="Filter by"
//             className="bg-white p-2 rounded"
//             id="inputfilter"
//           />
//         </div>

//         <div className="flex justify-between">

//           <select
//             className="flex flex-col p-2 rounded bg-white"
//             name="select"
//             id="select"
//             value={selectedOption}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="1">Alphabets</option>
//             <option value="2">Last Edited</option>
//             <option value="3">Recently Created</option>
//           </select>
//         </div>
//       </nav>

//       <button
//         onClick={() => navigate('/Home')}
//         id="button"
//         className="bg-[#437993] fixed bottom-6 right-6 hover:opacity-[0.9] text-white p-[20px] rounded-[8px] flex items-center gap-2"
//       >
//         Create New Note
//       </button>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";

export default function LandingPage() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Updated Filter & Sorting Logic

  // const cleanFilter = filter.trim().toLowerCase();
  const processedNotes = notes
    .filter(
      (n) =>
        n.title.toLowerCase().includes(filter.toLowerCase()) ||
        n.body.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "1") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "2") {
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      }
      if (sort === "3") {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      return 0;
    });

  return (
    <div>
      <Header />

      <nav className="bg-[#F7F7F7] flex justify-center py-[16px] flex-wrap px-2 gap-[40px]">
        <input
          type="text"
          placeholder="Filter by"
          className="bg-white p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="p-2 rounded bg-white outline-none "
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="1">Alphabets</option>
          <option value="2">Last Edited</option>
          <option value="3">Recently Created</option>
        </select>
      </nav>

      {/* Notes List */}
      <div className="flex flex-col items-center mt-6 px-4">
        {processedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => navigate(`/home?id=${note.id}`)}
          />
        ))}
      </div>

      <button
        onClick={() => navigate("/home")}
        className="bg-[#437993] fixed bottom-6 right-6 hover:opacity-90 text-white p-[20px] rounded-[8px] cursor-pointer shadow-lg"
      >
        Create New Note
      </button>
    </div>
  );
}
