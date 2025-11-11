import { Link } from "react-router-dom";

const Mainpage = () => {
  return (
    <>
      <section className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="h-auto w-[32rem] rounded-2xl bg-white shadow-2xl border p-10 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02]">
          {/* Logo */}
          <img
            src="/logo.png"
            className="h-24 w-24 mb-4 drop-shadow-md"
            alt="babafarid"
          />

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-wide">
            Baba Farid Hospital
          </h1>

          {/* Divider */}
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <Link
              className="text-white w-full flex justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 transition"
              to={"/recepition"}
            >
Reciption            </Link>
            <Link
              className="text-white w-full flex justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 transition"
              to={"/admindashboard"}
            >
              Admin Dashboard
            </Link>

            <Link
              className="text-white w-full flex justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 transition"
              to={"/indoormedmangment"}
            >
              Indoor Medicine
            </Link>

            <Link
              className="text-white w-full flex justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 transition"
              to={"/pharmacy"}
            >
              Pharmacy
            </Link>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-xs mt-10 border-t pt-4 w-full">
            Powered by{" "}
            <span className="font-semibold text-blue-600">
              CodeTrust by Azhar
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Mainpage;
