const TableHeader = ({ data }) => {
  const tableHeaders = Object.keys(data);

  console.log('tableHeaders', data);

  return (
    <tr>
        <th
          scope="col"
          className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
        >
          Tours Name
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
        >
          Description
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
          Starting Date
        </th>
      </tr>
  );
};

export default TableHeader;
