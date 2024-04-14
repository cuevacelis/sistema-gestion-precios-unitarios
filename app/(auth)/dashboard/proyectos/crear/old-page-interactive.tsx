import TableManager from "./partidas";

interface Subrow {
  name: string;
  value: string;
  subrows: Subrow[];
}

export default function ProyectNewPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      {/* Form */}
      <form className="mb-8">
        {/* Code */}
        <div className="flex mb-4">
          <label htmlFor="code" className="w-1/4">
            Code
          </label>
          <input
            id="code"
            type="text"
            readOnly
            className="w-3/4 border rounded px-2 py-1"
          />
        </div>
        {/* Name */}
        <div className="flex mb-4">
          <label htmlFor="name" className="w-1/4">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-3/4 border rounded px-2 py-1"
          />
        </div>
        {/* Location */}
        <div className="flex mb-4">
          <label htmlFor="location" className="w-1/4">
            Location
          </label>
          <select id="location" className="w-3/4 border rounded px-2 py-1">
            <option selected>Select location</option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
          </select>
        </div>
        {/* Client */}
        <div className="flex mb-4">
          <label htmlFor="client" className="w-1/4">
            Client
          </label>
          <select id="client" className="w-3/4 border rounded px-2 py-1">
            <option selected>Select client</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
          </select>
        </div>
        {/* Daily Wage */}
        <div className="flex mb-4">
          <label htmlFor="daily-wage" className="w-1/4">
            Daily Wage
          </label>
          <input
            id="daily-wage"
            type="text"
            className="w-3/4 border rounded px-2 py-1"
          />
        </div>
      </form>
      {/* Group of Items */}
      <h2 className="text-lg font-bold mb-4">Group of Items</h2>
      {/* Table of Items */}

      <TableManager />

      <div className="flex justify-end mt-8">
        <div className="flex items-center">
          <label htmlFor="budget" className="mr-2">
            Budget
          </label>
          <input id="budget" type="text" className="border rounded px-2 py-1" />
        </div>
      </div>
    </div>
  );
}
