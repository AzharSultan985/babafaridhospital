// Lab.js
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Lab = () => {
  const { labTests, fetchLabTests, addLabTest, deleteLabTest, isLabLoading } = useContext(AppContext);
  
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [formData, setFormData] = useState({ name: "", rate: "" });

  // Fetch tests on component mount
  useEffect(() => {
    fetchLabTests();
  }, [fetchLabTests]);

  // Delete confirmation handler
  const handleDeleteClick = (testId, testName) => {
    setTestToDelete({ id: testId, name: testName });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (testToDelete) {
      const result = await deleteLabTest(testToDelete.id);
      if (result.success) {
        console.log(`✅ Test "${testToDelete.name}" deleted successfully`);
      } else {
        alert(`Failed to delete test: ${result.error}`);
      }
      setShowDeleteModal(false);
      setTestToDelete(null);
    }
  };

  const handleDelete = (testId, testName) => {
    handleDeleteClick(testId, testName);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.rate) {
      const testData = {
        name: formData.name,
        rate: parseInt(formData.rate)
      };
      
      const result = await addLabTest(testData);
      
      if (result.success) {
        setFormData({ name: "", rate: "" });
        setShowForm(false);
        console.log("✅ New test added successfully");
      } else {
        alert("Failed to add test: " + result.error);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Tests</h1>
          <p className="text-gray-600 mt-2">Manage all laboratory test services</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          disabled={isLabLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {isLabLoading ? "Loading..." : "Add New Test"}
        </button>
      </div>

      {/* Add Test Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Test</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter test name"
                  required
                  disabled={isLabLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate (PKR)</label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter rate"
                  min="0"
                  required
                  disabled={isLabLoading}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLabLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {isLabLoading ? "Adding..." : "Add Test"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  disabled={isLabLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ DELETE CONFIRMATION MODAL */}
      {showDeleteModal && testToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-start gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Delete Test?</h2>
                <p className="text-sm font-medium text-red-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{
                  testToDelete.name
                }"</span>? This test will be permanently removed from the database.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2 flex gap-3 border-t border-gray-200">
              <button
                onClick={confirmDelete}
                disabled={isLabLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLabLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Test
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTestToDelete(null);
                }}
                disabled={isLabLoading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate (PKR)
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {labTests.map((test) => (
                <tr key={test._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {test.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ₨{test.rate.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(test._id, test.name)}
                      disabled={isLabLoading}
                      className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                      title={`Delete ${test.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {labTests.length === 0 && !isLabLoading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tests available</h3>
            <p className="mt-1 text-sm text-gray-500">Add your first laboratory test to get started.</p>
          </div>
        )}
        {isLabLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm text-gray-500">Loading tests...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lab;
