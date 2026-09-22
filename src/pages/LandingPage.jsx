import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { BASE_URL } from "../lib/utils";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const URL = `${BASE_URL}/api/notes`;

export default function LandingPage() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleLogout = () => {
      logout();
    }

  // Fetch all notes from Express Backend
  // useEffect(() => {
  //   fetch(URL)
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch notes");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setNotes(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(URL, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch notes");
      return res.json();
    })
    .then((data) => {
      setNotes(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
    if(user){
      navigate("/landing");
    }
}, [user]);

  // Filter & Sorting Logic
  const processedNotes = notes
    .filter(
      (n) =>
        n.title.toLowerCase().includes(filter.toLowerCase()) ||
        n.body.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
  if (sort === "1") {
    return a.title.localeCompare(b.title);
  }
  if (sort === "2") {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  }
  if (sort === "3") {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }
  return 0;
});

  return (
    <div>
      <Header />

      <nav className="bg-[#F7F7F7] flex justify-center py-4 flex-wrap px-2 gap-10">
        <input
          type="text"
          placeholder="Filter by"
          className="bg-white p-2 rounded outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="p-2 rounded bg-white outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="1">Alphabets</option>
          <option value="2">Last Edited</option>
          <option value="3">Recently Created</option>
        </select>

        <button onClick={handleLogout} className="bg-[#437993] text-white font-bold px-4 py-2 rounded mt-auto w-[150px] hover:bg-[#437993]">
          Logout
        </button>
      </nav>

      {/* Notes List */}
      <div className="flex flex-col items-center mt-6 px-4 gap-4">
        {loading ? (
          <p className="text-[#437993] text-lg font-semibold">Loading Notes...</p>
        ) : processedNotes.length === 0 ? (
          <p className="text-gray-500 text-lg">No notes found.</p>
        ) : (
          processedNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onClick={() => navigate(`/home?id=${note._id}`)} // Fixed: note._id
            />
          ))
        )}
      </div>

      <button
        onClick={() => navigate("/home")}
        className="bg-[#437993] fixed bottom-6 right-6 hover:opacity-90 text-white p-5 rounded-lg cursor-pointer shadow-lg font-medium"
      >
        Create New Note
      </button>
    </div>
  );
}