import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

//import dataProvider from "@pankod/refine-simple-rest";
import {dataProvider} from "./rest-data-provider"
import routerProvider from "@pankod/refine-react-router-v6";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";

import { IcsmsProductShow } from "pages/icsms/show";
import { IcsmsProductList } from "pages/icsms/list";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
          resources={[
            {
              name: "icsms",                
              list: IcsmsProductList,  //list: MuiInferencer,
              show: IcsmsProductShow,  //show: MuiInferencer,
              create: MuiInferencer,
              edit: ProductEdit,  //edit: MuiInferencer,
              options: { label: "ICSMS Products" }
            },
            {
                name: "products",                
                //list: ProductList,  
                list: MuiInferencer,
                //show: ProductShow,  
                show: MuiInferencer,
                create: MuiInferencer,
                edit: ProductEdit,  //edit: MuiInferencer,
                //options: { label: "prodss" }
            },
            {
              name: "users",
              list: MuiInferencer,
              show: MuiInferencer,
              create: MuiInferencer,
              edit: MuiInferencer,
          },
        ]}
          options={{ disableTelemetry: true}}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
