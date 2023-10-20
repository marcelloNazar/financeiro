import React from 'react';

interface TableHeaderProps {
  title: string;
  type: string;
  date: string;
  category: string;
  value: string;
  edit: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  type,
  date,
  category,
  value,
  edit,
}) => {
  return (
    <thead className="flex text-xs uppercase">
      <th className="item-data w-full bg-gray-800/50 lg:rounded-tl-lg">{title}</th>
      <th className="item-data dark:bg-gray-900/20 w-20">{type}</th>
      <th className="item-data hidden lg:block item-data w-32 bg-gray-800/50">{date}</th>
      <th className="item-data hidden lg:block w-56 dark:bg-gray-900/20">{category}</th>
      <th className="item-data bg-gray-800/50 w-64">{value}</th>
      <th className="item-data w-24">{edit}</th>
    </thead>
  );
};

export default TableHeader;
