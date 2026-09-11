export default function NoteCard({ note, onClick }) { // note parent(landing page) sy aya hua javascript object

  // agar note update hua ha to pahly updatedat uthay ga, agar vo na mila to createdat, agar vo b na mily to purani date field use karay ga
  const nDate = note.updatedAt || note.createdAt || note.date;
  
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    
    // Date agar string like milliseconds ma ho to usay pahly numbers ma convert karta ha [71294789347345]
    const timeNum = Number(dateValue);
    const dateObj = !isNaN(timeNum) ? new Date(timeNum) : new Date(dateValue);

    // Date valid na hone par check
    if (isNaN(dateObj.getTime())) return String(dateValue);

    // human readable format: 9/11/2026, 2:34 PM
    return dateObj.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#F7F7F7] p-5 mb-4 rounded-[5px] max-w-[700px] w-full cursor-pointer"
    >
      <h2 className="text-[16px] text-black">{note.title}</h2>
      <p className="text-[16px]">{note.body}</p>
      
      {/* Date display */}
      <p className="text-[16px] text-black">
        {formatDate(nDate)}
      </p>
    </div>
  );
}