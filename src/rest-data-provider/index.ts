// "axios" package needs to be installed
import { AxiosInstance } from "axios";
// "stringify" function is re-exported from "query-string" package by "@pankod/refine-simple-rest"
import { stringify } from "@pankod/refine-simple-rest";
import { DataProvider } from "@pankod/refine-core";
import { axiosInstance, generateSort, generateFilter } from "./utils";
import {users_data, products_data, icsms_products_data} from "./temp_data.js"

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({
    resource,
    hasPagination = true,
    pagination = { current: 1, pageSize: 10 },
    filters,
    sort,
  }) => {
    console.log("getList called");
    let url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10 } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = hasPagination
      ? {
          _start: (current - 1) * pageSize,
          _end: current * pageSize,
        }
      : {};

    const generatedSort = generateSort(sort);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    if (resource==="icsms"){
      url=`${apiUrl}/products`;
    }

    console.log(query)
    console.log(queryFilters)
    let { data, headers } = await httpClient.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );
    
    let total = +headers["x-total-count"];

    // temporary hard coded data! Note that it does not handle sort and filter!
    // if (resource==="users") {
    //   data = users_data
    //   total = 5
    // }
    // if (resource==="products"){
    //   data = products_data
    //   total = 20
    // }
    if (resource==="icsms"){
      data = icsms_products_data
      total = 2
    }


    return {
      data,
      total,
    };
  },

  getMany: async ({ resource, ids }) => {
    console.log("getMany called");

    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    if (resource==="categories") {
      // resourse is string with name of "table", ids is array of integers
    }
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    console.log("create called");

    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    console.log("update called");

    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    console.log("getOne called"); // url=https://api.fake-rest.refine.dev/products/12
    const resource_for_url = resource==="icsms"?"users":resource; // if icsms, do a httpClient.get and do not use its result (must, because of the async)
    const url = `${apiUrl}/${resource_for_url}/${id}`;
    const { data } = await httpClient.get(url);

    if (resource==="icsms") {
      const record : any = icsms_products_data[Number(id)-1]
      // copy props from record to data (because TS requires data to be of Type BaseRecord!)
      for (const key in record) {
        data[key] = record[key]
      }
    }
    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    console.log("deleteOne called");
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    console.log("custom called");
    let requestUrl = `${url}?`;

    if (sort) {
      const generatedSort = generateSort(sort);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
