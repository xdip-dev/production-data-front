import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { createAppLoader } from "./create-app-loader";
import { AppStore } from "@/core/store/create-store";
import Cannelaj from "./pages/Cannelaj/Cannelaj";
import Layout from "./Layout";

export const appRouter = ({ store }: { store: AppStore }) =>
	createBrowserRouter([
		{
			element: <Layout />,
			loader: createAppLoader({ store }),
			children: [
				{
					path: "/",
					element: <App />,
				},
				{
					path: "/cannelaj",
					element: <Cannelaj />,
				},
			],
		},
		// {
		// 	path: "/cannelaj",
		// 	element: <Layout />,
		// 	children: [
		// 		{
		// 			element: <Cannelaj />,
		// 		},
		// 	],
		// },
	]);

export type AppRouter = ReturnType<typeof appRouter>;
