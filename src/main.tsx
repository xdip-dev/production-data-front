import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./ui/Provider.tsx";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Dependencies, createAppStore } from "./core/store/create-store.ts";
import { appRouter } from "./ui/router.tsx";
import { inMemoryDevelopment } from "./development.mode.ts";
import { RealStepProductionGateway } from "./core/production/gateway/real-step-production.gateway.ts";
import { RealActionsGateway } from "./core/actions/gateways/real-actions.gateway.ts";
import { RealErpGateway } from "./core/erp/gateway/real-erp.gateway.ts";

let storeDependencie: Dependencies = {
	stepProductionGateway: new RealStepProductionGateway(),
	actionsGateway: new RealActionsGateway(),
	erpGateway: new RealErpGateway(),
};

if (import.meta.env.MODE === "development") {
	storeDependencie = inMemoryDevelopment();
}
const store = createAppStore(storeDependencie);

const router = appRouter({ store });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider router={router} store={store} />
	</React.StrictMode>
);
