export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  )
}

