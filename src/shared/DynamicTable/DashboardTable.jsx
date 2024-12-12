import React, { useEffect, useState } from "react";
import DynamicTable from "@/shared/DynamicTable/DynamicTable";

const DashboardTable = ({
  fetchDataFunc, // Fetch data function
  columnsConfig, // Function to generate columns
  ITEMS_PER_PAGE = 10, // Default items per page
  placeholder = "Search...", // Search placeholder
  reloadData, // Reload trigger
}) => {
  const [data, setData] = useState([]); // Table data
  const [loading, setLoading] = useState(true); // Loading state
  const [total, setTotal] = useState(0); // Total rows
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  const fetchData = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { response, error } = await fetchDataFunc({
      limit: ITEMS_PER_PAGE,
      offset,
      search: searchQuery,
    });
    if (response) {
      setData(response.documents);
      setTotal(response.total);
    } else {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [ currentPage, searchQuery,reloadData]);

  return (
    <div className="p-6">
      {/* Search */}
      <div className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-1/3 border p-2 rounded"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : data.length > 0 ? (
        <>
          <DynamicTable data={data} columns={columnsConfig} />
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              { length: Math.ceil(total / ITEMS_PER_PAGE) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ),
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default DashboardTable;
