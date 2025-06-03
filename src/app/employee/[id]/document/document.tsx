'use client'
import { useEffect, useState } from "react";
import { Documents, columns } from "./column";
import { DataTable } from "./data-table"
import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

const EmployeeDocuments = () => {
    const [documents, setDocuments] = useState<Documents[]>([])

    const [isLoading, setIsLoading] = useState(true);
    const params = useParams<{ id: string }>();
    const employeeId = params.id;
    useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/${employeeId}`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
        })

        if (!res.ok) throw new Error("Failed to fetch employees")

        const data = await res.json()
        setDocuments(data.documents)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData()
  }, [])
    const handleDownload = async (documentId: string) => {
    try {
        const token = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/download/${documentId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
        throw new Error("Failed to fetch download URL");
        }

        const data = await response.json();
        const fileUrl = data.url;

        // Fetch isi file sebagai blob
        const fileResponse = await fetch(fileUrl);
        const blob = await fileResponse.blob();

        // Buat URL sementara untuk blob
        const url = window.URL.createObjectURL(blob);

        // Buat link untuk download
        const link = document.createElement("a");
        link.href = url;
        link.download = `document-${documentId}.pdf`; // Atur nama file sesuai kebutuhan
        document.body.appendChild(link);
        link.click();

        // Bersihkan
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Download failed", err);
    }
    };


    return (
        
        <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <CardContent>
                <DataTable columns={columns(handleDownload)} data={documents} isLoading={isLoading}/>
            </CardContent>
        </Card>

    );
}

export default EmployeeDocuments;