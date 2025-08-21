import { Link } from "react-router-dom"


const Mainpage= ()=>{


    return (<>
    
    <section className=" h-[40rem] w-full  flex justify-center items-center ">

<div className="h-[25rem] w-[30rem] rounded-[7px] bg-slate-100 border p-20  flex justify-center flex-col items-center " >

    <h1 className="text-3xl font-bold mx-auto" >Baba Farid Hospital</h1>
    <div className="   p-[2rem] flex flex-col justify-center items-center">
    <button type="button" class="text-white w-[20rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            
        <Link to={'/admindashboard'}> Admin</Link>
        </button>
<button type="button" class="text-white w-[20rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">

<Link to={'/indoormedmangment'}> Indoor Medicine Manage</Link>
</button>

   
 </div>

</div>
    </section>
    
    </>)
}
export default Mainpage