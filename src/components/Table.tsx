"use client"
import React, { useState, useEffect } from 'react';

type TableProps = {
  title: string;
  headers: string[];
  rows: Array<{ [key: string]: string | number | React.ReactNode }>;
  rowClasses?: string;
};

const Table: React.FC<TableProps> = ({
  title,
  headers,
  rows,
  rowClasses = 'border-t border-gray-300 dark:border-gray-600',
}) => {
  const [sortedRows, setSortedRows] = useState(rows);

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const sortRows = (index: number) => {
    const sorted = [...sortedRows].sort((a, b) => {
      const aValue = Object.values(a)[index] ?? '';
      const bValue = Object.values(b)[index] ?? '';
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });
    setSortedRows(sorted);
  };

  return (
    <>
      <div className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4 text-center">{title}</div>
      <table className="min-w-full table-auto" aria-label={title}>
        <thead className="text-gray-900 dark:text-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => sortRows(index)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            sortedRows.map((row, index) => (
              <tr key={index} className={rowClasses}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="py-2 px-4">{value}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;