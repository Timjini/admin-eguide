import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useSelector } from 'react-redux';
import Graph from '../dashboard/Graph';

export default function Dashboard(props) {
  const user = useSelector(state => state.user);
  

  if (user.type === 'admin') {
    return (
      <div className="p-4 sm:ml-64">
        <UsersTable />
      </div>
    );
  } else {
    return (
      <div className="p-4 sm:ml-64">
        <h2>Dashboard</h2>
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark:text-gray-500">
                          <img src="https://img.freepik.com/free-vector/bar-graph_52683-9732.jpg?w=826&t=st=1695035748~exp=1695036348~hmac=f4fb0b60d21a9edd7e292a85263fc101769de7f29fe277642bea9fbafd34709e" alt="Bar Graph" className='graph'/>
                        </p>
                      </div>

                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <img src="https://img.freepik.com/free-vector/bar-graph_52683-9732.jpg?w=826&t=st=1695035748~exp=1695036348~hmac=f4fb0b60d21a9edd7e292a85263fc101769de7f29fe277642bea9fbafd34709e" alt="Bar Graph" className='graph'/>

                            </p>
                        </div>
                        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                            <img src="https://img.freepik.com/free-vector/bar-graph_52683-9732.jpg?w=826&t=st=1695035748~exp=1695036348~hmac=f4fb0b60d21a9edd7e292a85263fc101769de7f29fe277642bea9fbafd34709e" alt="Bar Graph" className='graph'/>

                            </p>
                        </div>
                    </div>
      </div>
      </div>
    );
  }
}
