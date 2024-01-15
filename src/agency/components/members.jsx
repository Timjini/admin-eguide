import React, { useState, useEffect } from 'react';
import { API_USER_IMAGE } from '../constant/index';
import AddMember from './AddMember';
import BackButton from '../components/BackButton';

const Members = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

//   console.log(data)

useEffect(() => {
    // Update filteredData whenever the data or searchQuery changes
    const filtered = data.filter((member) =>
      (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.username && member.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    console.log("filtered here", filtered);
    setFilteredData(filtered);
  }, [data, searchQuery]);

  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-row justify-between ">
          <div>
            <BackButton />
          </div>
          <div>
            <AddMember />
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 ">
          <div className="flex flex-row justify-between">
            <h3 className="py-5 text-2xl  ">Members</h3>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4  "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm  border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="mt-2 w-full text-sm text-left  ">
                    <thead className="text-xs  uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4   border-gray-300 rounded focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2  border-gray-600"
                            />
                            <label htmlFor="checkbox-all-search" className="sr-only">
                            checkbox
                            </label>
                        </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Action
                            </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && filteredData.map((member,index) =>
                        <tr key={index} className="border-b  ">
                            <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2  border-gray-600"
                                />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">
                                checkbox
                                </label>
                            </div>
                            </td>
                            <th
                            scope="row"
                            className="flex items-center px-6 py-4  whitespace-nowrap "
                            >
                            <img
                                className="w-10 h-10 rounded-full"
                                src={`${API_USER_IMAGE}/${member.avatar}`}
                                alt={member.name}
                            />
                            <div className="pl-3">
                                <div className="text-base font-semibold">{member.name}</div>
                                <div className="font-normal ">
                                {member.email}
                                </div>
                            </div>
                            </th>
                            <td className="px-6 py-4">
                            {member.isAgencyOwner === true ? 'Admin' : member.type}
                            </td>
                            <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${member.status === 'offline' ? 'bg-red-500' : 'bg-green-500' }  mr-2`} />{" "}
                                {member.status}
                            </div>
                            </td>
                            <td className="px-6 py-4">
                            <a
                                href="#"
                                className=""
                            >
                                Edit user
                            </a>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
        </div>
      </div>
    </>
  );
};

export default Members;

