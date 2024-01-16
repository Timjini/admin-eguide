import React,{useState, useEffect} from 'react';
// import {agencyApi} from './agencyApi';
import {API_PUBLIC_FOLDER, API_USER_IMAGE} from '../../constant/index';

const AllTours = ({data}) => {
    console.log("data here" , data)

    const formattedDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
        return formatted;
      };
      
  return (
    <div>
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
        {/* Card header */}
        <div className="items-center justify-between lg:flex">
          <div className="mb-4 lg:mb-0">
            <h3 className="py-5 text-2xl  ">
              Channels
            </h3>
            <span className="text-base font-normal  ">
              This is a list of latest channels
            </span>
          </div>
          <div className="items-center sm:flex">
            <div className="flex items-center">
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="mb-4 sm:mb-0 mr-4 inline-flex items-center   border border-gray-300 focus:outline-none hover: focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:  dark:border-gray-600 dark:hover: dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                Filter by status
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdown"
                className="z-10 hidden w-56 p-3  rounded-lg shadow dark:"
              >
                <h6 className="mb-3 text-sm font-medium  ">
                  Category
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                  <li className="flex items-center">
                    <input
                      id="apple"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4  border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark: dark:border-gray-500" />
                    <label
                      htmlFor="apple"
                      className="ml-2 text-sm font-medium  "
                    >
                      Completed (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="fitbit"
                      type="checkbox"
                      defaultValue=""
                      defaultChecked=""
                      className="w-4 h-4  border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark: dark:border-gray-500" />
                    <label
                      htmlFor="fitbit"
                      className="ml-2 text-sm font-medium  "
                    >
                      Cancelled (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="dell"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4  border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark: dark:border-gray-500" />
                    <label
                      htmlFor="dell"
                      className="ml-2 text-sm font-medium  "
                    >
                      In progress (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="asus"
                      type="checkbox"
                      defaultValue=""
                      defaultChecked=""
                      className="w-4 h-4  border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark: dark:border-gray-500" />
                    <label
                      htmlFor="asus"
                      className="ml-2 text-sm font-medium  "
                    >
                      In review (97)
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div date-rangepicker="" className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5  "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" />
                  </svg>
                </div>
                <input
                  name="start"
                  type="text"
                  className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark: dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="From" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5  "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" />
                  </svg>
                </div>
                <input
                  name="end"
                  type="text"
                  className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark: dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="To" />
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className=" dark:">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        Tour Name
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        Starting Date &amp;
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        Ending Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        Guide
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" dark:">
                    {data.tours.map((tour) => (
                      <tr key={tour.id}>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {tour.title}{" "}
                        </td>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {/* {formattedDate(channel.tour.starting_date)} */}
                        </td>
                        <td className="p-4 text-sm font-semibold  whitespace-nowrap ">
                          {/* {formattedDate(tour.ending_date)} */}
                        </td>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {/* {tour.code} */}
                        </td>
                        <td className="inline-flex items-center p-4 space-x-2 text-sm font-normal  whitespace-nowrap ">
                          <span>
                            {/* {tour.guide.user.name} */}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark: dark:text-green-400 border border-green-100 dark:border-green-500">
                            {/* {tour.status} */}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-6">
          <div>
            <button
              className="inline-flex items-center p-2 text-sm font-medium text-center  rounded-lg hover:  dark:hover:"
              type="button"
              data-dropdown-toggle="transactions-dropdown"
            >
              Last 7 days{" "}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              className="z-50 hidden my-4 text-base list-none  divide-y divide-gray-100 rounded shadow dark: dark:divide-gray-600"
              id="transactions-dropdown"
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm font-medium  truncate "
                  role="none"
                >
                  Sep 16, 2021 - Sep 22, 2021
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                    role="menuitem"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                    role="menuitem"
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                    role="menuitem"
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                    role="menuitem"
                  >
                    Last 30 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                    role="menuitem"
                  >
                    Last 90 days
                  </a>
                </li>
              </ul>
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm  hover:  dark:hover: dark:hover:"
                  role="menuitem"
                >
                  Custom...
                </a>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#"
              className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover: dark:text-primary-500 dark:hover:"
            >
              Channels Report
              <svg
                className="w-4 h-4 ml-1 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllTours;