import React,{useState, useEfect} from 'react';
// import {agencyApi} from './agencyApi';
import {API_PUBLIC_FOLDER, API_USER_IMAGE} from '../constant/index';
import AddTour from './AddTour';
import AddChannel from './AddChannel';

const Tour = ({data}) => {
    if (!data.tour || data.tour.length === 0) {
        console.log('No tour data available.');
        return null; // Return null or a message when there is no tour data
      }

    console.log('Tour data: ', data.tour);
      return (
        <>
            <div className='flex flex-row justify-center gap-5 flex-wrap'>
                {data.tour && data.tour.length > 0 ? (
                    data.tour.map((tour) => {
                        const guide = data.guide;
                        return (
                            <div key={tour._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div href="#">
                                    <img className="rounded-t-lg h-96 object-cover w-96" src={`${API_PUBLIC_FOLDER}${tour.image}`} alt="" />
                                </div>
                                <div className="p-5">
                                    <div href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tour.title}</h5>
                                    </div>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{tour.description}</p>
                                    <div className='flex flex-row gap-2 content-evenly'>
                                        <img className="w-10 h-10 rounded-full" 
                                            src={`${API_USER_IMAGE}/${guide[0].avatar}`}
                                            alt={guide[0].name}
                                        />
                                        <span>{guide[0].name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No tours available.</p>
                )}
            </div>
    
            <div className='flex flex-row mx-auto mt-5'>
                {(!data.tour || data.tour.length === 0) && <AddTour />}
            </div>
        </>
    );
    

}

export default Tour;
