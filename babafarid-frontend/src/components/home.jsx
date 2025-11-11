const Home = () => {
  return (
    <>
      <div className="flex justify-end items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white shadow-2xl mr-[6rem] rounded-3xl p-5 max-w-1xl text-center border border-gray-200 transform transition duration-500 hover:scale-[1.02]">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Hospital Logo"
              className="mx-auto mb-6 w-24 h-24 drop-shadow-md"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-wide">
            Welcome to <span className="text-blue-500">Babafarid Hospital</span>
          </h1>

          {/* Divider */}
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>

          {/* Quotes */}
          <p className="text-gray-700 italic mb-6 text-lg">
            “The best way to find yourself is to lose yourself in the service of others.”
          </p>
          <p className="text-gray-600 italic mb-6 text-md">
            “Healing is a matter of time, but it is sometimes also a matter of opportunity.”
          </p>

          {/* Mission Statement */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-blue-600">Our Mission:</span>{" "}
              Dedicated to care • Committed to excellence • Built with trust
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-gray-400 text-xs mt-8">
            Powered by <span className="font-semibold text-blue-600">CodeTrust by Azhar</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
