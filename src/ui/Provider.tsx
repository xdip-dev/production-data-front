import { PrimeReactProvider } from "primereact/api";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router";
import { AppStore } from "@/core/store/create-store";
import ToastProvider from "./components/ToastProvider";

export const Provider = ({ store, router }: { store: AppStore; router: AppRouter }) => (
	<ReduxProvider store={store}>
		<PrimeReactProvider>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</PrimeReactProvider>
	</ReduxProvider>
);
