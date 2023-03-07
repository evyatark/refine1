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
                headerName: "ברקוד",
                headerAlign: "center",
                //headerName: "GTIN (EAN) Code / Barcode",
                minWidth: 150,
            },
            {
                field: "type_model",
                headerName: "מודל",
                headerAlign: "center",
                //headerName: "Product",
                minWidth: 200,
            },
            {
                field: "country_of_origin",
                headerName: "מדינת מוצא",
                headerAlign: "center",
                //headerName: "Country of Origin",
                minWidth: 150,
            },
            {
                field: "brand",
                headerName: "מותג",
                headerAlign: "center",
                //headerName: "Brand",
                minWidth: 100,
            },
            {
                field: "product_name_english",
                headerName: "תיאור מוצר באנגלית",
                headerAlign: "center",
                //headerName: "Product Name (English)",
                minWidth: 300,
            },
            {
                field: "product_name_notifying_country",
                headerName: "Product name (notifying country)",
                minWidth: 200,
            },
            {
                field: "creation_date",
                headerName: "תאריך פתיחת חקירה",
                headerAlign: "center",
                align: "center",
                //headerName: "Date of Creation",
                minWidth: 150,
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
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
        <List canCreate={false}>            
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );

};
