// TableRow.js
import React from 'react';

const TableRow = ({ data , formattedDate}) => {
  return (
      <tr key={data.id}>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {data.channelName}{" "}
                        </td>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {formattedDate(data.tour.starting_date)}
                        </td>
                        <td className="p-4 text-sm font-semibold  whitespace-nowrap ">
                          {formattedDate(data.tour.ending_date)}
                        </td>
                        <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                          {data.code}
                        </td>
                        <td className="inline-flex items-center p-4 space-x-2 text-sm font-normal  whitespace-nowrap ">
                          <span>
                            {data.guide.user.name}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark: dark:text-green-400 border border-green-100 dark:border-green-500">
                            {data.status}
                          </span>
                        </td>
      </tr>
  );
};

export default TableRow;
