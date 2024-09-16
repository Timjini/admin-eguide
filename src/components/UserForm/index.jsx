import axios from "axios";
import { useState } from "react";

const FormComponent = ({ user, firstName, lastName }) => {
    console.log("USER ====>", user.agency.name)
    const [formData, setFormData] = useState({
        language: "English (US)",
        timezone: "GMT+0 Greenwich Mean Time (GMT)",
        firstName: firstName || "",
        lastName: lastName || "",
        address: "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        birthday: "",
        organization: user.agency.name || "",
        role: user.isAgencyOwner ? "Admin" : user.type || "",
        department: "Development",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Form Data", formData);
        try {
            axios.post()
        } catch (error) {

        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block mb-2 text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block mb-2 text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="phone-number" className="block mb-2 text-sm font-medium">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phone-number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="birthday" className="block mb-2 text-sm font-medium">
                            Birthday
                        </label>
                        <input
                            type="text"
                            name="birthday"
                            id="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="organization" className="block mb-2 text-sm font-medium">
                            Organization
                        </label>
                        <input
                            type="text"
                            name="organization"
                            id="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium">
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="department" className="block mb-2 text-sm font-medium">
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            id="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-6 mt-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="settings-language" className="block mb-2 text-sm font-medium">
                            Select a language
                        </label>
                        <select
                            id="settings-language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="sm:text-sm rounded-lg block w-full p-2.5"
                        >
                            <option>English (US)</option>
                            <option>Italiano</option>
                            <option>Français (France)</option>
                            <option>正體字</option>
                            <option>Español (España)</option>
                            <option>Deutsch</option>
                            <option>Português (Brasil)</option>
                        </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="settings-timezone" className="block mb-2 text-sm font-medium">
                            Select a time zone
                        </label>
                        <select
                            id="settings-timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleChange}
                            className="border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                        >
                            <option>GMT+0 Greenwich Mean Time (GMT)</option>
                            <option>GMT+1 Central European Time (CET)</option>
                            <option>GMT+2 Eastern European Time (EET)</option>
                            <option>GMT+3 Moscow Time (MSK)</option>
                            <option>GMT+5 Pakistan Standard Time (PKT)</option>
                            <option>GMT+8 China Standard Time (CST)</option>
                            <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-6 sm:col-full">
                    <button class="bg-white hover:bg-gray-600 text-gray-800 hover:text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-6" type="submit">
                        Save all
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormComponent;
