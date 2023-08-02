export interface ModalProps {
    btnName: string;
    title: string;
    size?: "sm" | "lg" | "xl";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentRef?:React.MutableRefObject<any>
}