import { useContext, useState } from "react";
import { AuthContext } from "../context/LoginContext";

const Login = () => {
  const { setUsername, setPassword, LoginIndoor, loading, loggedinRes } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Toast */}
      <section className="w-full flex justify-center bg-gray-50 h-[5vh] ">
        {loggedinRes && (
          <div
            id="toast-simple"
            className="flex items-center mt-3 w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm"
            role="alert"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
            </svg>
            <div className="ps-4 text-sm font-normal">{loggedinRes}</div>
          </div>
        )}
      </section>

      {/* Main Form */}
      <div className="bg-gray-50 ">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <div className="w-full flex justify-center my-4 items-center">
              <h1>{loading ? "loading...." : ""}</h1>
              <img
                src="/logo.png"
                className="h-18 w-20 mx-2"
                alt="babafarid"
              />
              <h1 className="text-4xl font-bold ">Baba Farid Hospital</h1>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Sign in to Dashboard
              </h1>

              <form className="mt-12 space-y-6">
                {/* Username */}
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      autoComplete="username"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter user name"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-10 rounded-md outline-blue-600"
                      placeholder="Enter password"
                    />
                    {/* Toggle Eye */}
                    {showPassword ? (
                      // Open eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#555"
                        className="w-5 h-5 absolute right-3 cursor-pointer"
                        viewBox="0 0 24 24"
                        onClick={() => setShowPassword(false)}
                      >
                        <path d="M12 5c-7.633 0-11.27 6.614-11.463 6.962a1 1 0 0 0 0 .977C.73 13.386 4.367 20 12 20s11.27-6.614 11.463-6.962a1 1 0 0 0 0-.977C23.27 11.614 19.633 5 12 5zm0 13c-5.451 0-8.623-4.659-9.463-6 .84-1.341 4.012-6 9.463-6s8.623 4.659 9.463 6c-.84 1.341-4.012 6-9.463 6z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      // Closed eye (eye slash)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#555"
                        className="w-5 h-5 absolute right-3 cursor-pointer"
                        viewBox="0 0 24 24"
                        onClick={() => setShowPassword(true)}
                      >
                        <path d="M12 5c-7.633 0-11.27 6.614-11.463 6.962a1 1 0 0 0 0 .977C.73 13.386 4.367 20 12 20c1.715 0 3.262-.334 4.628-.903l-1.523-1.523A8.42 8.42 0 0 1 12 18c-5.451 0-8.623-4.659-9.463-6 .558-.891 2.188-3.168 5.105-4.705L6.05 6.704C3.063 8.49 1.27 11.614 1.037 12.038a1 1 0 0 0 0 .924C1.27 13.386 4.907 20 12 20c1.447 0 2.795-.304 4.02-.828l1.527 1.527A11.29 11.29 0 0 1 12 21C4.367 21 .73 14.386.537 14.038a1 1 0 0 1 0-.962C.73 11.614 4.367 5 12 5a11.29 11.29 0 0 1 5.547 1.301l-1.422 1.422A8.42 8.42 0 0 0 12 5z" />
                        <line x1="3" y1="3" x2="21" y2="21" stroke="#555" strokeWidth="2" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="!mt-12">
                  <button
                    type="button"
                    onClick={LoginIndoor}
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
