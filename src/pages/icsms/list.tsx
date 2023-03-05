import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    //DeleteButton,
    List,
    MarkdownField,
} from "@pankod/refine-mui";
import { useMany } from "@pankod/refine-core";

export const IcsmsProductList = () => {
    const { dataGridProps } = useDataGrid();
    const columns = React.useMemo<GridColumns<any>>(
        () => [
            // {
            //     field: "id",
            //     headerName: "Id",
            //     type: "number",
            //     minWidth: 50,
            // },
            {
                field: "barcode",
                headerName: "GTIN (EAN) Code / Barcode",
                minWidth: 200,
            },
            {
                field: "type_model",
                headerName: "Product",
                minWidth: 200,
            },
            {
                field: "photo",
                headerName: "Photo of product",
                minWidth: 200,
            },
            {
                field: "product_name_english",
                headerName: "Product Name (English)",
                minWidth: 200,
            },
            {
                field: "product_name_notifying_country",
                headerName: "Product name (notifying country)",
                minWidth: 200,
            },
            {
                field: "creation_date",
                headerName: "Date of Creation",
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },

        ],[]
    );
    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );

};
