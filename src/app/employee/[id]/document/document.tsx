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
  // const handleDownload = async (documentId: string) => {
  //   try {
  //     const token = Cookies.get("token");

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/download/${documentId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch download URL");
  //     }

  //     const data = await response.json();
  //     const fileUrl = data.document_url;

  //     // Ambil ekstensi dari URL
  //     const urlPath = new URL(fileUrl).pathname;
  //     const extMatch = urlPath.match(/\.[0-9a-z]+$/i);
  //     const extension = extMatch ? extMatch[0] : "";

  //     const fileName = `document-${documentId}${extension}`;

  //     // Simulasikan klik langsung ke file dengan nama file khusus
  //     const link = document.createElement("a");
  //     link.href = fileUrl;
  //     link.download = fileName; // Nama file lokal yang akan disimpan user
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (err) {
  //     console.error("Download failed", err);
  //   }
  // };
  const handleDownload = async (documentId: string) => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/download/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch download URL");
    }

    const data = await response.json();
    const fileUrl = data.document_url;

    // Buka file di tab baru
    window.open(fileUrl, "_blank", "noopener,noreferrer");
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