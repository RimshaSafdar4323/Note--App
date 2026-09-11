// import { useState } from 'react';
// import Header from './components/Header';
// import { Link } from 'react-router-dom';

// export default function Home() {

//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');

//   const handleAddNote = () => {
//     console.log("Adding Note:", { title, body });

//   };

//   return (
//     <div>
//       <Header />

//       <nav className="bg-[#F7F7F7] text-[18px] flex justify-center py-[16px] flex-wrap px-2 min-h-[60px] gap-2">
//         <div className=" max-w-[700px] w-full hover:text-[#437993]">
//           <Link to="/">Home</Link>
//         </div>
//       </nav>

//       <main className="flex flex-col gap-[16px] mt-[16px]">
//         <div className="max-w-[1920px] flex flex-col justify-center items-center gap-4">
//           <input
//             type="text"
//             placeholder="Type Your Notes Title"
//             className="bg-[#F7F7F7] border-0 w-full max-w-[700px] p-3 rounded text-[20px] focus:outline-none focus:border-[#437993]"
//             id="titleInput"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <textarea
//             placeholder="Type Your Notes Body"
//             className="bg-[#F7F7F7] border-0 w-full max-w-[700px] p-[12px] rounded text-[20px] focus:outline-none focus:border-[#437993]"
//             id="bodyInput"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//         </div>

//         <div className="max-w-[700px] w-full mx-auto flex justify-between">
//           <button
//             className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] text-white mt-[12px]"
//             onClick={handleAddNote}
//             id="addBtn"
//           >
//             Add Notes
//           </button>

//           <button
//             className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] text-white hidden mt-[12px]"
//             id="updateBtn"
//           >
//             Update
//           </button>
//         </div>

//         <button className='bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9]  mt-[12px] text-white hidden
//          ' id="deleteBtn" onClick="deleteNote()">
//           Delete

//         </button>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("id"); //agar URL (/home?id=101) hai to noteId mein 101 bajyn gy agarURL (/home) hai to null bajyn gy

  useEffect(() => {
    //jab b noteId change ho
    if (noteId) {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const singleNote = savedNotes.find((n) => n.id === noteId);
      if (singleNote) {
        setTitle(singleNote.title);
        setBody(singleNote.body);
      }
    }
  }, [noteId]);

  const handleAddNote = () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Empty Notes is not allowed");
      return;
    }
    // if (!title.trim()) {
    //   toast.error("Empty Note Title is not allowed");
    //   return;
    // }
    // if (!body.trim()) {
    //   toast.error("Empty Note Body is not allowed");
    //   return;
    // }
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const currentTime = Date.now();

    const newNote = {
      id: currentTime.toString(), // current timestamp milliseconds ma as a unique id use hoti ha
      title: title,
      body: body,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    localStorage.setItem("notes", JSON.stringify([...savedNotes, newNote])); // purani sab note ky agay new note add karta ha
    navigate("/");
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
      }
      else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
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
      <nav className="bg-[#F7F7F7] text-[18px] flex justify-center py-[16px]">
        <div
          onClick={() => navigate("/")}
          className="max-w-[700px] w-full hover:text-[#437993] cursor-pointer"
        >
          Home
        </div>
      </nav>

      <main className="flex flex-col gap-[16px] mt-[16px]">
        <div className="max-w-[1920px] flex flex-col justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Type Your Notes Title"
            className="bg-[#F7F7F7] w-full max-w-[700px] p-3 rounded text-[20px] outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Type Your Notes Body"
            className="bg-[#F7F7F7] w-full max-w-[700px] p-[12px] rounded text-[20px] outline-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="max-w-[700px] w-full mx-auto flex justify-between">
          {!noteId ? (
            <button
              onClick={handleAddNote}
              className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-90 text-white mt-[12px]"
            >
              Add Notes
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdateNote}
                className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-90 text-white mt-[12px]"
              >
                Update
              </button>

              <button
                onClick={handleDeleteNote}
                className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-90 text-white mt-[12px]"
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
