import { UserPlusIcon } from "@heroicons/react/24/solid";
import {Link} from 'react-router-dom';


const TableHeaderNavigation = ({title, model , data, type}) => {
  console.log(data)
    return (
    <nav className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="flex space-x-4">
        <Link to={`/${type}/${model}/create`} className="flex items-center gap-3 mb-2 primaryBtn rounded-lg px-3 py-1 transition duration-700 ease-in-out"> 
          <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> 
          ADD {model} 
        </Link>
      </div>
    </nav>
  )
}

export default TableHeaderNavigation;