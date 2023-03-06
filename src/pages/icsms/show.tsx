import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Typography,
    Stack,
    NumberField,
    TextFieldComponent as TextField,
    MarkdownField,
} from "@pankod/refine-mui";

// show ICSMS products (such as https://webgate.ec.europa.eu/icsms/public/productDetail.jsp?p=1c0f4dcd-0bf0-4cd2-afb3-34a68b03821f&locale=en )
export const IcsmsProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;
    // expect record to have the following properties:
    // id (probably required by refine)
    // barcode, product_name_english, product_name_notifying_country, product_category, brand, type_model, 
    // search_criteria_product_key_words, photo_or_drawing_of_product_packaging, country_of_origin, EU_EFTA_country
    // and sub table "investigations"!!
    // this is currently taken care of in rest-data-provider/index.ts
    

    // query for category
    // const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    //     resource: "categories",
    //     id: record?.category?.id || "",
    //     queryOptions: {
    //         enabled: !!record,
    //     },
    // });

    return (
            <div
                    style={{
                        direction: "ltr",
                    }}
                >
        <Show 
            headerProps={{
                sx: {
                    backgroundColor: "pink",
                    color: "black"
                }, 
            }}
            contentProps={{
                sx: {
                    backgroundColor: "lightgreen",
                },
            }}
            isLoading={isLoading} title={<Typography variant="h5">תראה לי את המוצר</Typography>} >
            <Stack gap={1} >
                <Typography variant="body1" fontWeight="bold">
                    GTIN (EAN) Code / Barcode
                </Typography>
                <TextField value={record?.barcode ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Product name (English)
                </Typography>
                <TextField value={record?.product_name_english} />
                <Typography variant="body1" fontWeight="bold">
                    Product name (notifying country)
                </Typography>
                <TextField value={record?.product_name_notifying_country} />
                <Typography variant="body1" fontWeight="bold">
                    Product category
                </Typography>
                <TextField value={record?.product_category} />
                <Typography variant="body1" fontWeight="bold">
                    Brand
                </Typography>
                <TextField value={record?.brand} />
                <Typography variant="body1" fontWeight="bold">
                    Type/Model
                </Typography>
                <TextField value={record?.type_model} />
                <Typography variant="body1" fontWeight="bold">
                    Country of origin
                </Typography>
                <TextField value={record?.country_of_origin} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>
            </Stack>
        </Show>
        </div>
    );
};
