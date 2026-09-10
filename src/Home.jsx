import { useState } from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddNote = () => {
    console.log("Adding Note:", { title, body });
    
  };

  return (
    <div>
      <Header />
      
      <nav className="bg-[#F7F7F7] text-[18px] flex justify-center py-[16px] flex-wrap px-2 min-h-[60px] gap-2">
        <div className=" max-w-[700px] w-full hover:text-[#437993]">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <main className="flex flex-col gap-[16px] mt-[16px]">
        <div className="max-w-[1920px] flex flex-col justify-center items-center gap-4">
          <input 
            type="text" 
            placeholder="Type Your Notes Title" 
            className="bg-[#F7F7F7] border-0 w-full max-w-[700px] p-3 rounded text-[20px] focus:outline-none focus:border-[#437993]" 
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <textarea 
            placeholder="Type Your Notes Body" 
            className="bg-[#F7F7F7] border-0 w-full max-w-[700px] p-[12px] rounded text-[20px] focus:outline-none focus:border-[#437993]" 
            id="bodyInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="max-w-[700px] w-full mx-auto flex justify-between">
          <button 
            className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] text-white mt-[12px]" 
            onClick={handleAddNote}
            id="addBtn"
          >
            Add Notes
          </button>

          <button 
            className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] text-white hidden mt-[12px]"
            id="updateBtn"
          >
            Update
          </button>
        </div>

        <button className='bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9]  mt-[12px] text-white hidden
         ' id="deleteBtn" onClick="deleteNote()">
          Delete

        </button>
      </main>
    </div>
  );
}