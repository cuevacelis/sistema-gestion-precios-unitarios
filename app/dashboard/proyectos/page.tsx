import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
};

interface IProps {
  params: {
    id: string;
  };
}

export default function ProyectPage(props: IProps) {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Project Title */}
      <h1 className="text-2xl font-bold mb-4">Project Title</h1>
      {/* Search Engine and New Button */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1 mr-2"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New
        </button>
      </div>
      {/* Table with Edit Button */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Column 1</th>
            <th className="border border-gray-300 px-4 py-2">Column 2</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Data 1</td>
            <td className="border border-gray-300 px-4 py-2">Data 2</td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
            </td>
          </tr>
          {/* Add more rows here */}
        </tbody>
      </table>
    </div>
  );
}
