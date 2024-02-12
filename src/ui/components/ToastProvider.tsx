import { AppDispatch } from "@/core/store/create-store";
import { hideToast, selectToast } from "@/core/store/utils/utils.slice";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	children: React.ReactNode;
}

export default function ToastProvider({ children }: Props) {
	const toastRef = useRef<Toast>(null);
	const toast = useSelector(selectToast);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (toast && toastRef.current) {
			toastRef.current.show(toast);
			dispatch(hideToast());
		}
	}, [toast, dispatch]);

	return (
		<>
			<Toast ref={toastRef} />
			{children}
		</>
	);
}
