import Sidebar from "@/components/sidebar";
import SuratFormPreview from "./template/surat";
export default function AddDocument(){
    return (
        <Sidebar title="Add Document">
            <SuratFormPreview></SuratFormPreview>
        </Sidebar>
    );
}