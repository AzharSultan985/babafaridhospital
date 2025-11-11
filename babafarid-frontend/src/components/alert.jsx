export default function Alert({ alertMsg, type = "info" }) {
  if (!alertMsg) return null; // nothing to show if no message

  const typeClasses = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <section className="flex justify-center w-full fixed top-4 z-50">
      <div
        className={`flex items-center w-full max-w-xs p-4 rounded-lg shadow-sm border ${typeClasses[type]}`}
        role="alert"
      >
      

        <div className="text-sm font-medium">{alertMsg}</div>
      </div>
    </section>
  );
}
