export interface ModalProps {
    btnName: string;
    title: string;
    size?: "sm" | "lg" | "xl";
    parentRef?:React.MutableRefObject<any>
}