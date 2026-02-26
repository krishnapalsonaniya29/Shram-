
// import React, { useEffect, useState } from "react";
// import "./Workers.css";
// import {
//   getWorkerData,
//   getAllWorkers,
//   getWorkerWorkHistory,
// } from "../api/workerRoutes/allWorkers";
// import { deleteWorker } from "../api/workerRoutes/allWorkers";

// function Workers() {
//   const [workers, setWorkers] = useState([]);
//   const [filteredWorkers, setFilteredWorkers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [workHistory, setWorkHistory] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [reportStats, setReportStats] = useState(null);

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       try {
//         const response = await getAllWorkers();
//         const workersData = Array.isArray(response.workers)
//           ? response.workers
//           : [];
//         const flatWorkers = workersData.flat();
//         const sortedData = flatWorkers.sort((a, b) => a.id - b.id);
//         setWorkers(sortedData);
//         setFilteredWorkers(sortedData);
//       } catch (error) {
//         console.error("Error fetching workers:", error);
//       }
//     };
//     fetchWorkers();
//   }, []);

//   useEffect(() => {
//     const lowerTerm = searchTerm.toLowerCase();
//     const filtered = workers.filter(
//       (worker) =>
//         worker.workerName?.toLowerCase().includes(lowerTerm) ||
//         worker.workerUsername?.toLowerCase().includes(lowerTerm)
//     );
//     setFilteredWorkers(filtered);
//   }, [searchTerm, workers]);

//   useEffect(() => {
//     if (selectedWorker && selectedDate) {
//       const fetchHistory = async () => {
//         setLoadingHistory(true);
//         try {
//           const formattedDate = new Date(selectedDate)
//             .toISOString()
//             .split("T")[0];
//           const response = await getWorkerWorkHistory(
//             selectedWorker.id,
//             formattedDate
//           );
//           setWorkHistory(response.worker || []);
//         } catch (error) {
//           console.error("Error fetching work history:", error);
//           setWorkHistory([]);
//         }
//         setLoadingHistory(false);
//       };
//       fetchHistory();
//     }
//   }, [selectedWorker, selectedDate]);

//   useEffect(() => {
//     const fetchWorkerData = async () => {
//       if (selectedWorker) {
//         try {
//           const response = await getWorkerData(selectedWorker.workerUsername);
//           if (response.reports) {
//             setReportStats(response.reports);
//           }
//         } catch (error) {
//           console.error("Error fetching worker data:", error);
//         }
//       }
//     };
//     fetchWorkerData();
//   }, [selectedWorker]);
// const handleDelete = async (id) => {
//   try {
//     await deleteWorker(id);
//     alert("Worker deleted successfully");
//     fetchWorkers(); // refresh list
//   } catch (error) {
//     console.error("Error deleting worker:", error);
//   }
// };
//   return (
//     <div className="workers-page">
//       <div className="workers-container">
//         {!selectedWorker ? (
//           <>
//             <div className="header-section">
//               <h2>All Workers</h2>
//               <p>View, search, and manage all registered workers</p>
//             </div>

//             <div className="search-bar-container">
//               <input
//                 type="text"
//                 placeholder="Search by name or username..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>

//             <div className="table-container">
//               <table className="workers-table">
//                 <thead>
//                   <tr className="table-header">
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Username</th>
//                     <th>Skill</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredWorkers.length > 0 ? (
//                     filteredWorkers.map((worker) => (
//                       <tr key={worker.id}>
//                         <td>{worker.id}</td>
//                         <td>{worker.workerName}</td>
//                         <td>{worker.workerUsername}</td>
//                         <td>{worker.skill}</td>
//                         <td>
//                           <div className="action-buttons">
//                           <button
//                             className="view-btn"
//                             onClick={() => setSelectedWorker(worker)}
//                           >
//                             View Profile
//                           </button>
//                           <button
//   className="delete-btn"
//   onClick={() => handleDelete(worker.id)}
// >
//   Delete
// </button>
// </div>
//                         </td>
                          
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="no-data">
//                         No workers found 😕
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         ) : (
//           <>
//             <button className="back-btn" onClick={() => setSelectedWorker(null)}>
//               ← Back
//             </button>

//             <div className="worker-profile">
//               <h2>{selectedWorker.workerName}</h2>
//               <div className="worker-info">
//                 <p>
//                   <strong>Username:</strong> {selectedWorker.workerUsername}
//                 </p>
//                 <p>
//                   <strong>Skill:</strong> {selectedWorker.skill}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {selectedWorker.gender}
//                 </p>
//                 <p>
//                   <strong>Contact:</strong> {selectedWorker.contact_number}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {selectedWorker.address}
//                 </p>
//               </div>

//               <div className="report-section">
//                 <h4>Reports Summary</h4>
//                 {reportStats ? (
//                   <div className="report-stats">
//                     <div className="report-box total">
//                       <span className="count">{reportStats.total}</span>
//                       <span className="label">Total</span>
//                     </div>
//                     <div className="report-box pending">
//                       <span className="count">{reportStats.pending}</span>
//                       <span className="label">Pending</span>
//                     </div>
//                     <div className="report-box resolved">
//                       <span className="count">{reportStats.resolved}</span>
//                       <span className="label">Resolved</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <p>Loading report details...</p>
//                 )}
//               </div>

//               <div className="date-selector">
//                 <h4>Select Date to View Work History</h4>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="calendar-input"
//                 />
//               </div>

//               {selectedDate && (
//                 <div className="work-history-section">
//                   <h3>
//                     Work History on{" "}
//                     {new Date(selectedDate).toLocaleDateString("en-GB")}
//                   </h3>

//                   {loadingHistory ? (
//                     <p className="loading">Loading work history...</p>
//                   ) : workHistory.length > 0 ? (
//                     <table className="work-history-table">
//                       <thead>
//                         <tr>
//                           <th>Organization</th>
//                           <th>Entry Time</th>
//                           <th>Leaving Time</th>
//                           <th>Overtime Entry Time</th>
//                           <th>Overtime Leaving Time</th>
//                           <th>Total Wage (₹)</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {workHistory.map((entry, idx) => (
//                           <tr key={idx}>
//                             <td>{entry.orgName}</td>
//                             <td>{entry.entryTime}</td>
//                             <td>{entry.leavingTime}</td>
//                             <td>{entry.overtimeEntryTime || "—"}</td>
//                             <td>{entry.overtimeLeavingTime || "—"}</td>
//                             <td>{entry.amount}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p className="no-data">
//                       No work history found for this date.
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Workers;


import React, { useEffect, useState, useCallback } from "react";
import "./Workers.css";
import {
  getWorkerData,
  getAllWorkers,
  getWorkerWorkHistory,
  deleteWorker,
} from "../api/workerRoutes/allWorkers";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [workHistory, setWorkHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [reportStats, setReportStats] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchWorkers = useCallback(async () => {
    try {
      const response = await getAllWorkers();
      const workersData = Array.isArray(response.workers)
        ? response.workers
        : [];
      const flatWorkers = workersData.flat();
      const sortedData = flatWorkers.sort((a, b) => a.id - b.id);
      setWorkers(sortedData);
      setFilteredWorkers(sortedData);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = workers.filter(
      (worker) =>
        worker.workerName?.toLowerCase().includes(lowerTerm) ||
        worker.workerUsername?.toLowerCase().includes(lowerTerm)
    );
    setFilteredWorkers(filtered);
  }, [searchTerm, workers]);

  useEffect(() => {
    if (selectedWorker && selectedDate) {
      const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
          const formattedDate = new Date(selectedDate)
            .toISOString()
            .split("T")[0];

          const response = await getWorkerWorkHistory(
            selectedWorker.id,
            formattedDate
          );
          setWorkHistory(response.worker || []);
        } catch (error) {
          console.error("Error fetching work history:", error);
          setWorkHistory([]);
        }
        setLoadingHistory(false);
      };
      fetchHistory();
    }
  }, [selectedWorker, selectedDate]);

  useEffect(() => {
    const fetchWorkerData = async () => {
      if (selectedWorker) {
        try {
          const response = await getWorkerData(
            selectedWorker.workerUsername
          );
          if (response.reports) {
            setReportStats(response.reports);
          }
        } catch (error) {
          console.error("Error fetching worker data:", error);
        }
      }
    };
    fetchWorkerData();
  }, [selectedWorker]);

  const handleDelete = async () => {
    if (!selectedWorker) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedWorker.workerName}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);
      await deleteWorker(selectedWorker.id);

      alert("Worker deleted successfully");

      setSelectedWorker(null);
      await fetchWorkers();
    } catch (error) {
      console.error("Error deleting worker:", error);
      alert("Failed to delete worker.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="workers-page">
      <div className="workers-container">
        {!selectedWorker ? (
          <>
            <div className="header-section">
              <h2>All Workers</h2>
              <p>View, search, and manage all registered workers</p>
            </div>

            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="table-container">
              <table className="workers-table">
                <thead>
                  <tr className="table-header">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Skill</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.length > 0 ? (
                    filteredWorkers.map((worker) => (
                      <tr key={worker.id}>
                        <td>{worker.id}</td>
                        <td><a href="#" onClick={() => setSelectedWorker(worker)}>{worker.workerName}</a></td>
                        <td>{worker.workerUsername}</td>
                        <td>{worker.skill}</td>
                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No workers found 😕
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
          <div className="profile-header">
            <button
              className="back-btn"
              onClick={() => setSelectedWorker(null)}
            >
              ← Back
            </button>
            <button
                className="delete-btn profile-delete"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Worker"}
              </button>
          </div>
            <div className="worker-profile">
              <h2>{selectedWorker.workerName}</h2>

              

              <div className="worker-info">
                <p>
                  <strong>Username:</strong>{" "}
                  {selectedWorker.workerUsername}
                </p>
                <p>
                  <strong>Skill:</strong> {selectedWorker.skill}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedWorker.gender}
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  {selectedWorker.contact_number}
                </p>
                <p>
                  <strong>Address:</strong> {selectedWorker.address}
                </p>
              </div>

              {/* Rest of your profile UI unchanged */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Workers;