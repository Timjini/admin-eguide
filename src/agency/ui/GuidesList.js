import {API_USER_IMAGE} from '../../constant/index';

const GuidesList = ({data}) => {
    console.log( "guides List component" ,data)
    return (
        <ul
            role="list"
            className="divide-y w-1/3 shadow px-10  py-6 rounded-lg max-h-96 overflow-auto"
          >
            {data.map((guide, index) => (
            <li className="py-3 sm:py-4" key="index">
                {/* overflow-hidden has a nice style as well */}
                 <div className="overflow-visible  relative max-w-sm mx-auto  shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 shadow highlight-white/5">
                <img
                    className="absolute -left-6 w-24 h-24 rounded-full shadow-lg object-cover"
                    src={`${API_USER_IMAGE}/${guide.user.avatar}`}
                />
                <div className="flex flex-col py-5 pl-24">
                    <strong className="text-sm font-medium ">
                    {guide.user.name}
                    </strong>
                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">
                    {guide.user.email}
                    </span>
                </div>
                <div className='ml-24 h-4 w-4 bg-red-600 rounded-full' >

                </div>
                </div>
            </li>
            
            ))}
        </ul>


    )
}

export default GuidesList ;



