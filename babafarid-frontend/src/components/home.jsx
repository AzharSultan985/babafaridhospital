import { Link } from "react-router-dom";

const Home = () => {
  return <>
  <div className="text-2xl text-white h-100 w-full p-8 items-center">

  <h1>Welcome to Babafarid Hospital Dashboard</h1>
     <Link to={'/dashboard'}  className="text-1xl text-blue-600 ">Dasboard</Link>
     <br/>
      <Link to="/addindoormed" className="text-1xl text-blue-600">Add Indoor Medicine</Link>
  </div>
  </>

};

export default Home;