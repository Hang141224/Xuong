import { Button } from "@/components/ui/button";


import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { columns } from "./Column";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import { useState } from "react";
import DataTable from "./DataTable";
import FooterTable from "./FooterTable";
import HeaderTable from "./HeaderTable";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import axios from "axios";

const ProductList = () => {
    // const { data, isLoading } = useProductQuery();
    const { data, isLoading } = useQuery({
        queryKey: ["Order"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8000/api/v1/products");
            return data;
        },
    });

    // if (isLoading) return <p>Loading...</p>;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: data ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isLoading) return <p>Loading...</p>
    console.log(data);

    return (
        <>
            <div className="flex justify-between items-center py-3">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Quản lý sản phẩm
                    </h2>
                </div>
                <div>
                    <Link
                        to="/admin/products/add"
                        className="flex items-center"
                    >
                        <Button>
                            <Plus />
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="my-5">
                <div className="w-full">
                    <div className="flex items-center py-4">
                        <HeaderTable table={table} />
                    </div>
                    <div className="rounded-md border">
                        <DataTable table={table} column={columns} />
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <FooterTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;