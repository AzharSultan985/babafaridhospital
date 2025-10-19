import { useState } from "react";
import Alert from "../../components/alert";
import { usePharmacy } from "../ContextPharma/PharmaContext";

const PhramaLogin = () => {
  const { setpassword, setusername, PharmaLogin, alertMsg, alertType } = usePharmacy();
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  return (
    <>
      {alertMsg && <Alert alertMsg={alertMsg} type={alertType} />}

      <div className="bg-gray-50">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <div className="w-full flex justify-center my-4 items-center">
              <img src="/logo.png" className="h-18 w-20 mx-2" alt="babafarid" />
              <h1 className="text-4xl font-bold">Baba Farid Hospital</h1>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Sign in to Pharmacy
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
                      onChange={(e) => setusername(e.target.value)}
                      type="text"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="10" cy="7" r="6" />
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                    </svg>
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
                      onChange={(e) => setpassword(e.target.value)}
                      type={showPassword ? "text" : "password"} // 👁️ Toggle input type
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-10 rounded-md outline-blue-600"
                      placeholder="Enter password"
                    />

                    {/* 👁️ Eye icon for toggle */}
                    {showPassword ? (
                      <svg
                        onClick={() => setShowPassword(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 absolute right-4 cursor-pointer hover:fill-gray-600"
                      >
                        <path d="M12 5c-7.633 0-11.518 6.777-11.876 7.423a1 1 0 0 0 0 .962C.482 13.223 4.367 20 12 20s11.518-6.777 11.876-7.423a1 1 0 0 0 0-.962C23.518 11.777 19.633 5 12 5zm0 13c-5.897 0-9.295-5.182-9.91-6.005C3.139 10.91 6.124 8 12 8s8.861 2.91 9.91 3.995C21.295 12.818 17.897 18 12 18z" />
                        <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                        <path d="m2 2 20 20-1.414 1.414L.586 3.414z" />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setShowPassword(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 absolute right-4 cursor-pointer hover:fill-gray-600"
                      >
                        <path d="M12 5C4.367 5 .482 11.777.124 12.423a1 1 0 0 0 0 .962C.482 13.223 4.367 20 12 20s11.518-6.777 11.876-7.423a1 1 0 0 0 0-.962C23.518 11.777 19.633 5 12 5zm0 13c-5.897 0-9.295-5.182-9.91-6.005C3.139 10.91 6.124 8 12 8s8.861 2.91 9.91 3.995C21.295 12.818 17.897 18 12 18z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    onClick={PharmaLogin}
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

export default PhramaLogin;
