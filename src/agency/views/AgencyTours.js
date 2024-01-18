import React,{useState, useEfect} from 'react';
// import {agencyApi} from './agencyApi';
import {API_PUBLIC_FOLDER, API_USER_IMAGE} from '../../constant/index';
import AddTour from '../management/AddTour';
import TableRow from '../TablesContent/TableRow';
import TableHeader from '../TablesContent/TableHeader';

const AgencyTour = ({data}) => {
    if (!data.tours || data.tours.length === 0) {
        console.log('No tour data available.');
        return null; // Return null or a message when there is no tour data
      }

    console.log('Tour data: ', data.tours);
      return (
        <>
            <div className='flex flex-row justify-center gap-5 flex-wrap'>
                {data.tours && data.tours.length > 0 ? (
                    data.tours.map((tour) => {
                        const guide = data.guide;
                        return (
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 ">
                                <div className="flex flex-row justify-between">
                                </div>
                                <table className="mt-2 w-full text-sm text-left  ">
                                            <thead className="text-xs  uppercase bg-gray-50  ">
                                            <TableHeader data={tour}/>
                                            </thead>
                                            <tbody className="">
                                            <TableRow  data={tour} formattedDate={null}/>
                                        </tbody>
                                        </table>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No tours available.</p>
                )}
            </div>
        </>
    );
    

}

export default AgencyTour;
