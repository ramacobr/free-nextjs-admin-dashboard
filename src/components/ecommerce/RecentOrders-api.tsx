'use client';


import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { use, useState, useEffect } from "react";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

interface quarkProduct {
    id: number;
    description: string;
    name: string;
    price: number;
}

type SortField = 'name' | 'description' | 'price';
type SortOrder = 'asc' | 'desc';

const baseAPIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/products";

export default function RecentOrders() {
  const [tableDataQuarkus, setTableDataQuarkus] = useState<quarkProduct[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    fetch(`${baseAPIURL}`)
      .then((res) => res.json())
      .then((data) => {
        // setTableDataQuarkus(data);
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
        }));
        setTableDataQuarkus(transformedData);
        console.log('Transformed Data:', transformedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      }
    );
      setSortOrder('asc');
    }, []);

  const sortedData = [...tableDataQuarkus].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'description':
        return multiplier * a.description.localeCompare(b.description);
      case 'price':
        return multiplier * (a.price - b.price);
      default:
        return 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '⬆' : '⬇';
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 font-medium text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Products {getSortIcon('name')}
                </button>
              </TableCell>
              <TableCell isHeader className="py-3">
                <button
                  onClick={() => handleSort('description')}
                  className="flex items-center gap-1 font-medium text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Category {getSortIcon('description')}
                </button>
              </TableCell>
              <TableCell isHeader className="py-3">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 font-medium text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Price {getSortIcon('price')}
                </button>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {/* {product.id} -  */}
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.description}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
