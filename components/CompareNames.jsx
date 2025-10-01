// components/CompareNames.jsx
export default function CompareNames({ names }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {names.map(name => (
        <div key={name.name} className="p-6 border rounded-xl">
          <h3 className="text-xl font-bold mb-2">{name.name}</h3>
          <p className="text-gray-600">{name.meaning}</p>
          {/* Add comparison metrics */}
        </div>
      ))}
    </div>
  );
}