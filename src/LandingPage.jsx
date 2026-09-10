import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

export default function LandingPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <Header/>

      <nav className="bg-[#F7F7F7] flex justify-center py-[16px] flex-wrap px-2 gap-[40px] min-h-[60px]">
        <div>
          <input 
            type="text" 
            placeholder="Filter by" 
            className="bg-white p-2 rounded" 
            id="inputfilter" 
          />
        </div>
        
        <div className="flex justify-between">

          <select
            className="flex flex-col p-2 rounded bg-white"
            name="select"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="1">Alphabets</option>
            <option value="2">Last Edited</option>
            <option value="3">Recently Created</option>
          </select>
        </div>
      </nav>

      <button 
        onClick={() => navigate('/Home')} 
        id="button" 
        className="bg-[#437993] fixed bottom-6 right-6 hover:opacity-[0.9] text-white p-[20px] rounded-[8px] flex items-center gap-2"
      >
        Create New Note
      </button>
    </div>
  );
}