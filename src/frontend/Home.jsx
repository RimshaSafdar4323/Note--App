import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
const URL = "http://localhost:5000/api/notes";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("id"); //agar URL (/home?id=101) hai to noteId mein 101 bajyn gy agarURL (/home) hai to null bajyn gy

  // useEffect(() => {
  //   //jab b noteId change ho
  //   if (noteId) {
  //     const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  //     const singleNote = savedNotes.find((n) => n.id === noteId);
  //     if (singleNote) {
  //       setTitle(singleNote.title);
  //       setBody(singleNote.body);
  //     }
  //   }
  // }, [noteId]);

  useEffect(() => {
    if (noteId) {
      fetch(`${URL}/${noteId}`)
        .then((res) => {
          if (!res.ok) 
            throw new Error("Note not found");
          return res.json();
        })
        .then((data) => {
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [noteId]);




  const handleAddNote = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Empty Notes is not allowed");
      return;
    }
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        toast.success("Note added successfully");
        navigate("/");
      } else {
        const errText = await response.text();
        toast.error(errText);
      }
    } catch (error) {
      toast.error("Server connection failed");
    }
  };

  // const handleUpdateNote = () => {
  //   const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  //   const updatedNotes = savedNotes.map((n) =>
  //     n.id === noteId ? { ...n, title, body, updatedAt: Date.now() } : n,
  //   );

  //   localStorage.setItem("notes", JSON.stringify(updatedNotes));
  //   navigate("/");
  // };

  const handleUpdateNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this note?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        const updatedNotes = savedNotes.map((n) =>
          n.id === noteId ? { ...n, title, body, updatedAt: Date.now() } : n,
        );

        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        navigate("/");
      } else if (result.isDenied)
        Swal.fire("Changes are not saved", "", "info");
    });
  };

  // const handleDeleteNote = () => {
  //   const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  //   const filteredNotes = savedNotes.filter((n) => n.id !== noteId);

  //   localStorage.setItem("notes", JSON.stringify(filteredNotes));
  //   navigate("/");
  // };

  const handleDeleteNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        const filteredNotes = savedNotes.filter((n) => n.id !== noteId);

        localStorage.setItem("notes", JSON.stringify(filteredNotes));

        Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your note is safe :)",
          icon: "error",
        });
      }
    });
  };

  return (
    <div>
      <Header />
      <Toaster />
      <nav className="bg-[#F7F7F7] text-[18px] flex justify-center py-4">
        <div
          onClick={() => navigate("/")}
          className="max-w-175 w-full hover:text-[#437993] cursor-pointer"
        >
          Home
        </div>
      </nav>

      <main className="flex flex-col gap-4 mt-4">
        <div className="max-w-[1920px] flex flex-col justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Type Your Notes Title"
            className="bg-[#F7F7F7] w-full max-w-175 p-3 rounded text-[20px] outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Type Your Notes Body"
            className="bg-[#F7F7F7] w-full max-w-175 p-3 rounded text-[20px] outline-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="max-w-175 w-full mx-auto flex justify-between">
          {!noteId ? (
            <button
              onClick={handleAddNote}
              className="bg-[#437993] p-3 rounded-lg cursor-pointer hover:opacity-90 text-white mt-3"
            >
              Add Notes
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdateNote}
                className="bg-[#437993] p-3 rounded-lg cursor-pointer hover:opacity-90 text-white mt-3"
              >
                Update
              </button>

              <button
                onClick={handleDeleteNote}
                className="bg-[#437993] p-3 rounded-lg cursor-pointer hover:opacity-90 text-white mt-3"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
