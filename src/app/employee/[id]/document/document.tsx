'use client'
import { useEffect, useState } from "react";
import { Documents, columns } from "./column";
import { DataTable } from "./data-table"
import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast, Toaster } from "sonner";

const EmployeeDocuments = ({ isActive }: { isActive: boolean }) => {
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

        if (!res.ok) {
          const responseData = await res.json();
          throw responseData; 
        }

        const data = await res.json()
        setDocuments(data.documents)
      } catch (err) {
    
        let message = "Unknown error occurred";
        let messagesToShow: string[] = [];

        if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
        ) {
        const backendError = err as { message: string; errors?: Record<string, string[]> };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
            message = "Unknown error occurred";
        } else {
            message = backendError.message;
        }

        messagesToShow = backendError.errors
            ? Object.values(backendError.errors).flat()
            : [message];
        } else {
        messagesToShow = [message]
        }

        toast.error(
            <>
                <p className="text-red-700 font-bold">Error</p>
                {messagesToShow.map((msg, idx) => (
                <div key={idx} className="text-red-700">• {msg}</div>
                ))}
            </>,
            { duration: 30000 }
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchData()
  }, [])
  
  const handleDownload = async (documentId: string) => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/download/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw responseData; 
    }

    const data = await response.json();
    const fileUrl = data.document_url;

    // Buka file di tab baru
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  } catch (err) {
    let message = "Unknown error occurred";
    let messagesToShow: string[] = [];

    if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof (err as any).message === "string"
    ) {
    const backendError = err as { message: string; errors?: Record<string, string[]> };

    if (backendError.message.toLowerCase().includes("failed to fetch")) {
        message = "Unknown error occurred";
    } else {
        message = backendError.message;
    }

    messagesToShow = backendError.errors
        ? Object.values(backendError.errors).flat()
        : [message];
    } else {
    messagesToShow = [message]
    }

    toast.error(
        <>
            <p className="text-red-700 font-bold">Error</p>
            {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">• {msg}</div>
            ))}
        </>,
        { duration: 30000 }
    );
  }
};






    return (
        <>
          <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
         {isLoading ? ( 
            <Card className=" flex items-center justify-center rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <Spinner size="medium" />
            </Card>

            ) : (
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <CardContent>
                <DataTable columns={columns(handleDownload)} data={documents} isLoading={isLoading} isActive={isActive}/>
              </CardContent>
             </Card>
          )}
        
        </>
    );
}

export default EmployeeDocuments;