import React,{useState, useEfect} from 'react';
// import {agencyApi} from './agencyApi';
import {API_PUBLIC_FOLDER} from '../constant/index';

const Tour = ({data}) => {
    if (!data.tour || data.tour.length === 0) {
        // console.log('No tour data available.');
        return null; // Return null or a message when there is no tour data
      }

    
    return (
        <>
        {data.tour.map((tour) => {
            const guide = data.guide;
            console.log(guide[0].avatar);
            return (
            <article className="mx-auto group w-full shadow-2xl max-w-md pb-8 rounded-b-2xl transform duration-500 hover:-translate-y-2 cursor-pointer">
                <section className="content bg-cover bg-center h-64 rounded-2xl" 
                    style={{backgroundImage: `url(${API_PUBLIC_FOLDER}/${tour.photo})`}}
                >
                    <div className="flex items-end w-full h-full bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded-2xl">
                        <div className="w-1/2 flex items-center">
                            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
                            <span>4116</span>
                        </div>
                        <div className="w-1/2 flex items-center flex-row-reverse">
                            <svg className="w-6 h-6 ml-2 place-items-end group-hover:animate-ping absolute " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
                            <svg className="w-6 h-6 ml-2 place-items-end relative" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
                            <span className="place-items-end">16</span>
                        </div>
                    </div>
                </section>
                <div className="my-4 p-4 flex">
                    <img className="w-10 h-10 rounded-full " 
                        src={`${API_PUBLIC_FOLDER}/${guide[0].avatar}`}
                        alt={guide[0].name}
                        />
                    <div className="w-full flex justify-end space-x-1">
                    </div>
                </div>
                <div className="mt-6 px-4">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.6)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
                    <h2 className="mt-4 text-base font-medium text-gray-400">{tour.title}</h2>
                    <p className="mt-2 text-2xl text-gray-700">
                        {tour.description}
                    </p>
                </div>
            </article>
            );
        })}
        </>
    )

}

export default Tour;
