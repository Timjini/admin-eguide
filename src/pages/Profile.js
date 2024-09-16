import React from 'react';
import { useSelector } from 'react-redux';
import Logout from '../Authentication/Logout';
import { API_USER_IMAGE } from '../constant/index';
import BackButton from '../components/Buttons/BackButton';
import UserForm from '../components/UserForm';

export default function Profile() {
    const user = useSelector(state => state.user.user);

    const firstName = user && user.name ? user.name.split(" ")[0] : "";
    const lastName = user && user.name ? user.name.split(" ").slice(1).join(" ") : "";

    return (
        <div className="content-wrapper">
            <div className="">
                <BackButton />
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 content-wrapper">
                <div className="mb-4 col-span-full xl:mb-2">
                    <h3 className="py-5 text-2xl  ">
                        User settings
                    </h3>
                </div>
                {/* Right Content */}
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4  border rounded-lg shadow-sm 2xl:col-span-2  sm:p-6">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img
                                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 object-cover"
                                src={`${API_USER_IMAGE}/${user.avatar}`}
                                alt={user.email}
                            />
                            <div>
                                <h3 className="mb-1 text-xl font-bold ">
                                    {user.name ? user.name : user.email}
                                </h3>
                                <div className="mb-4 text-sm ">
                                    JPG, GIF or PNG. Max size of 800K
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg  focus:ring-4 "
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2 -ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                                        </svg>
                                        Upload picture
                                    </button>
                                    <button
                                        type="button"
                                        class="bg-white hover:bg-gray-600 text-gray-800 hover:text-white font-semibold px-3 border border-gray-400 rounded shadow"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6 ">
                        <h3 className="mb-4 text-xl font-semibold ">
                            General information, Timezone, and Language
                        </h3>
                        <UserForm firstName={firstName} lastName={lastName} user={user} />
                    </div>
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6 ">
                        <h3 className="mb-4 text-xl font-semibold ">
                            Password information
                        </h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="current-password"
                                        className="block mb-2 text-sm font-medium "
                                    >
                                        Current password
                                    </label>
                                    <input
                                        type="text"
                                        name="current-password"
                                        id="current-password"
                                        className="shadow-sm  border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5  "
                                        placeholder="••••••••"
                                        required=""
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium "
                                    >
                                        New password
                                    </label>
                                    <input
                                        data-popover-target="popover-password"
                                        data-popover-placement="bottom"
                                        type="password"
                                        id="password"
                                        className=" border text-sm rounded-lg block w-full p-2.5 "
                                        placeholder="••••••••"
                                        required=""
                                    />
                                    <div
                                        data-popover=""
                                        id="popover-password"
                                        role="tooltip"
                                        className="absolute z-10 invisible inline-block text-sm font-light  transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72  "
                                    >
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold ">
                                                Must have at least 6 characters
                                            </h3>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="h-1 " />
                                                <div className="h-1 " />
                                                <div className="h-1  " />
                                                <div className="h-1  " />
                                            </div>
                                            <p>It’s better to have:</p>
                                            <ul>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 "
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Upper &amp; lower case letters
                                                </li>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 "
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    A symbol (#$&amp;)
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 "
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    A longer password (min. 12 chars.)
                                                </li>
                                            </ul>
                                        </div>
                                        <div data-popper-arrow="" />
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium "
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="text"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5  "
                                        placeholder="••••••••"
                                        required=""
                                    />
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <button
                                        className=" font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                                        type="submit"
                                    >
                                        Save all
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6 ">
                        <div className="flow-root">
                            <h3 className="text-xl font-semibold ">Sessions</h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="inline-flex items-center">
                                            <Logout />

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}