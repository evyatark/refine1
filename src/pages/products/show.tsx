import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Typography,
    Stack,
    NumberField,
    TextFieldComponent as TextField,
    MarkdownField,
} from "@pankod/refine-mui";

export const ProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
            <div
                    style={{
                        direction: "rtl",
                    }}
                >
        <Show isLoading={isLoading} title={<Typography variant="h5">תראה לי את המוצר</Typography>} >
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    שם
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    חומר
                </Typography>
                <TextField value={record?.material} />
                <Typography variant="body1" fontWeight="bold">
                    תיאור
                </Typography>
                <MarkdownField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    מחיר
                </Typography>
                <TextField value={record?.price} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>

                {categoryIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{categoryData?.data?.title}</>
                )}
            </Stack>
        </Show>
        </div>
    );
};
