import { useContext, useState } from "react";
import { DoctorsContext } from "../staffContext/doctorsContext.jsx";

const DoctorLogin = () => {
  const {HandleLogindoctor, loggedin_Doctor_Res } = useContext(DoctorsContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const LoginDoctor=()=>{
    HandleLogindoctor(formData)
  }
  return (
    <>
      <section className="w-full flex justify-center bg-slate-50 h-[6vh] items-center p-4">
        {loggedin_Doctor_Res && (
          <div className="flex items-center max-w-xs p-4 space-x-4 text-slate-700 bg-white/90 border border-slate-200 rounded-xl shadow-md">
            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm font-medium">{loggedin_Doctor_Res}</div>
          </div>
        )}
      </section>

      <div className="bg-slate-50">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            
            {/* Header - Thora Better */}
            <div className="w-full flex justify-center my-6 items-center">
              <img src="/logo.png" className="h-20 w-20 mx-3 rounded-xl shadow-md" alt="logo" />
              <h1 className="text-4xl font-bold text-slate-900">Baba Farid Hospital</h1>
            </div>

            <div className="p-8 rounded-2xl bg-white/95 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <h1 className="text-slate-900 text-center text-2xl font-bold mb-2 tracking-tight">
                Doctor Login
              </h1>
              <p className="text-slate-600 text-center text-sm mb-10 font-medium">Access Patient Dashboard</p>

              <form className="space-y-6">
                
                {/* Username - Improved */}
                <div>
                  <label className="text-slate-900 text-sm font-semibold mb-3 block tracking-wide">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full text-slate-900 text-sm border-2 border-slate-200 px-4 py-4 pr-12 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all duration-200 hover:border-slate-300 shadow-sm"
                      placeholder="Enter Doctor ID"
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Password - Improved */}
                <div>
                  <label className="text-slate-900 text-sm font-semibold mb-3 block tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full text-slate-900 text-sm border-2 border-slate-200 px-4 py-4 pr-12 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all duration-200 hover:border-slate-300 shadow-sm"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="!mt-10">
                  <button
                    type="button"
                    onClick={LoginDoctor}
                    className="w-full py-4 px-6 text-lg font-semibold tracking-wide rounded-xl text-white bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-900 focus:outline-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Sign In
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

export default DoctorLogin;
