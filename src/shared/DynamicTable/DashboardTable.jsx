import React, { useEffect, useState } from "react";
import { DynamicTable } from "@/shared/DynamicTable/DynamicTable";

const DashboardTable = ({
  fetchDataFunc,  // The function to fetch data, passed as a prop
  columnsConfig,  // The columns configuration for the table
  ITEMS_PER_PAGE = 10,  // Default items per page
  placeholder = "Search...", // Placeholder text for search input
  reloadData, // Flag to trigger reload
}) => {
  const [data, setData] = useState([]); // Holds the table data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [total, setTotal] = useState(0); // Total number of documents
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filters, setFilters] = useState({}); // Filter criteria

  // Fetch data with pagination, search, and filters
  const fetchData = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { response, error } = await fetchDataFunc({
      limit: ITEMS_PER_PAGE,
      offset,
      search: searchQuery,
      filters,
    });

    if (response) {
      setData(response.documents);
      setTotal(response.total); // Update total documents count
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  // Trigger reload when reloadData changes
  useEffect(() => {
      fetchData();
    
  }, [reloadData, currentPage, searchQuery, filters]);


  // Handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="p-6">
      {/* Search and Filter UI */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Dynamic Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-500 text-lg">Loading...</span>
        </div>
      ) : data.length > 0 ? (
        <>
          <DynamicTable data={data} columns={columnsConfig} />

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(total / ITEMS_PER_PAGE) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default DashboardTable;
