import React, { useState, useEffect } from 'react';
import useGetGuides from '../components/getGuides';


const ChannelCreate = ({}) => {
    
  const {guides ,loading:guidesLoading, error, refetch } = useGetGuides();

    console.log("All guides", guides);
    
    return(
        <>  
        <div className='content-wrapper'>
          <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-20" >
          
          </div>
        </div>
          
        </>
    )
}
export default ChannelCreate;