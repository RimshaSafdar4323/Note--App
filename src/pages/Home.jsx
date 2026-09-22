import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_URL } from "../lib/utils";
import { useAuthContext } from "../hooks/useAuthContext";

const URL = `${BASE_URL}/api/notes`;

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingAPI, setProcessingAPI] = useState(false);


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("id");

  const { user } = useAuthContext();




  // Fetch Single Note when noteId is available in URL
  // useEffect(() => {
  //   if (noteId) {
  //     setLoading(true);
  //     fetch(`${URL}/${noteId}`)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Note not found");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setTitle(data.title);
  //         setBody(data.body);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         toast.error(err.message);
  //         setLoading(false);
  //       });
  //   } else {
  //     setTitle("");
  //     setBody("");
  //   }
  // }, [noteId]);

  useEffect(() => {
  if (noteId && user) {
    setLoading(true);

    fetch(`${URL}/${noteId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Note not found");
        }
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  } else if (!noteId) {
    setTitle("");
    setBody("");
  }
}, [noteId, user]);





  // Create Note
  const handleAddNote = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Empty Notes are not allowed");
      return;
    }
    setProcessingAPI(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        setTitle("");
        setBody("");
        navigate("/landing");
      } else {
        const errText = await response.text();
        toast.error(errText);
      }
    } catch (error) {
      toast.error("Server connection failed");
    }finally{
      setProcessingAPI(false);
    }
  };





  // Update Note
  const handleUpdateNote = () => {
    if(!title || !body) {
      toast.error("Title or body can't be empty")
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this note?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/${noteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${user.token}`},
            body: JSON.stringify({ title, body }),
          });

          if (response.ok) {
            navigate("/landing");
          } else {
            const errText = await response.text();
            toast.error(errText);
          }
        } catch (error) {
          toast.error("Server connection failed");
        }
      }
    });
  };






  // Delete Note
  const handleDeleteNote = () => {
    if(!user){
      toast.error("You must be logged in to delete a note");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/${noteId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${user.token}` },
          });

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your note has been deleted.",
              icon: "success",
            }).then(() => {
              navigate("/landing");
            });
          } else {
            const errText = await response.text();
            toast.error(errText);
          }
        } catch (error) {
          toast.error("Server connection failed");
        }
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
          onClick={() => navigate("/landing")}
          className="max-w-175 w-full hover:text-[#437993] cursor-pointer"
        >
          Home
        </div>
      </nav>

      <main className="flex flex-col gap-4 mt-4">
        {loading ? (
          <div className="text-center text-xl text-[#437993]">Loading Note...</div>
        ) : (
          <>
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
                  disabled={processingAPI}
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
          </>
        )}
      </main>
    </div>
  );
}