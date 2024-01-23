const DashboardGuidesStats = (count) => {
  console.log(count)
    return (
      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-20" >
      <a
         href="#"
         className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
         >
         <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
               <h5 className="mb-2 text-4xl font-bold tracking-tight ">
                  {count.count.data.guides}
               </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
            airport_shuttle
            </span>
         </div>
         <span className="font-medium ">
         Active Guides
         </span>
      </a>
      <a
         href="#"
         className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
         >
         <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
               <h5 className="mb-2 text-4xl font-bold tracking-tight ">
               {count.count.data.channels}
               </h5>
            </div>
            <span class="material-symbols-outlined dahboard_icon">
            your_trips  
            </span>
         </div>
         <span className="font-medium  ">
         Current Trips
         </span>
      </a>
      <a
         href="#"
         className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
         >
         <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
               <h5 className="mb-2 text-4xl font-bold tracking-tight ">
               {count.count.data.tourists}
               </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
            map
            </span>
         </div>
         <span className="font-medium ">
         Current Travelers
         </span>
      </a>
   </div>
    )
}

export default DashboardGuidesStats;