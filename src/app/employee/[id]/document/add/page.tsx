    'use client'

    import { useState, useRef } from "react"
    import Sidebar from "@/components/sidebar";
    import { EmploymentContractForm, EmploymentContractForm2 } from "./template/surat";
    import { Card } from "@/components/ui/card";
    import { Label } from "@/components/ui/label";
    import Link from 'next/link';
    import { Button } from "@/components/ui/button";
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select"
    import { FileUploader } from "@/components/ui/fileUploader";
    import { DialogClose } from "@/components/ui/dialog";
    import { Input } from "@/components/ui/input";
    import { useParams } from "next/navigation";
    import dynamic from "next/dynamic";
    import { useRouter } from "next/navigation";

    export default function AddDocument() {
        const [selectedTemplate, setSelectedTemplate] = useState("")
        const [mode, setMode] = useState("upload")
        // const [documentType, setDocumentType] = useState("");
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState(false);
        const [error, setError] = useState(false);
        const router = useRouter();
        
        const documentTypeRef = useRef<HTMLInputElement>(null);

        const templates: Record<string, () => string> = {
            employment: EmploymentContractForm,
            employment2: EmploymentContractForm2,
        }

        const fileInputRef = useRef<HTMLInputElement>(null);
        const formRef = useRef<HTMLFormElement>(null);

        const handleFileDrop = (files: File[]) => {
            if (files.length > 0 && fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(files[0]);
                fileInputRef.current.files = dataTransfer.files;
            }
        }

        const params = useParams<{ id: string }>();
        const employeeId = params.id;

        const QuillEditor = dynamic(() => import('@/components/ui/quill'), {
            ssr: false,
        });


        const quillRef = useRef<{ getPdfBlob: () => Promise<Blob | null> }>(null);
        const timestamp = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hour = String(now.getHours()).padStart(2, '0');
            const minute = String(now.getMinutes()).padStart(2, '0');

            return `${year}${month}${day}${hour}${minute}`;
        };

        const handleSubmitFormManual = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            setError(false);
            setSuccess(false);

            try {
                if (!formRef.current) return;

                const formData = new FormData(formRef.current);

                if (mode === "template" && quillRef.current) {
                    const blob = await quillRef.current.getPdfBlob();
                    if (!blob) throw new Error("Gagal membuat PDF");

                    formData.delete("document"); // pastikan tidak ada file lain
                    formData.append("document", new File([blob], `document${timestamp()}.pdf`, { type: "application/pdf" }));
                }

                const response = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Gagal submit");

                setSuccess(true);
                setTimeout(() => {
                    router.push(`/employee/${employeeId}`); // redirect setelah sukses
                }, 1500);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        return (
            <Sidebar title="Add Document">
                <div className="flex flex-col">
                    <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden p-6">
                        <div className="flex flex-col gap-[6px]">
                            <span className="text-base text-neutral-900">Upload Document or Select Template</span>
                            <div className="flex gap-[8px]">
                                <div className="flex flex-col justify-end gap-[8px]">
                                    
                                    <Button className="!h-[46px]" variant={"calendar"}
                                        // variant={mode === "upload" ? "default" : "outline"}
                                        onClick={() => {
                                            setMode("upload");
                                            setSelectedTemplate(""); // Unselect dropdown
                                        }}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_462_2152)">
                                        <path d="M13.75 9.99963V13.1246C13.75 13.2904 13.6842 13.4494 13.5669 13.5666C13.4497 13.6838 13.2908 13.7496 13.125 13.7496H1.875C1.70924 13.7496 1.55027 13.6838 1.43306 13.5666C1.31585 13.4494 1.25 13.2904 1.25 13.1246V9.99963H0V13.1246C0 13.6219 0.197544 14.0988 0.549175 14.4505C0.900805 14.8021 1.37772 14.9996 1.875 14.9996H13.125C13.6223 14.9996 14.0992 14.8021 14.4508 14.4505C14.8025 14.0988 15 13.6219 15 13.1246V9.99963H13.75Z" fill="currentColor"/>
                                        <path d="M7.47924 -0.00014548C7.23311 -0.000823982 6.98926 0.0470776 6.76168 0.140814C6.53409 0.23455 6.32725 0.372278 6.15299 0.546105L3.70361 2.99548L4.58736 3.87923L6.85861 1.6086L6.87486 11.8749H8.12486L8.10861 1.61735L10.3705 3.87923L11.2542 2.99548L8.80486 0.546105C8.63072 0.372297 8.42398 0.234576 8.1965 0.140838C7.96902 0.0471004 7.72527 -0.000809992 7.47924 -0.00014548Z" fill="currentColor"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_462_2152">
                                        <rect width="15" height="15" fill="white"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                        Upload Document
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                    {/* <Label htmlFor="template">Select Template</Label> */}
                                    <Select
                                        value={selectedTemplate}
                                        onValueChange={(value) => {
                                            setSelectedTemplate(value);
                                            setMode("template");
                                        }}
                                    >
                                        <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-600">
                                            <SelectValue placeholder="Select document template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="employment">Employment Contract</SelectItem>
                                            <SelectItem value="employment2">Employment Contract 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                               
                            </div>
                        </div>
                        
                        {/* <form  ref={formRef} action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data"  onSubmit={handleInsertPdfBeforeSubmit}> */}
                        <form
                        ref={formRef}
                        onSubmit={handleSubmitFormManual}
                        encType="multipart/form-data"
                        >

                            <div className="flex gap-6 justify-between flex-col lg:flex-row">
                        
                            <div className="flex flex-col gap-[8px] w-full lg:w-1/3">
                                <div className="flex flex-col gap-[5px]">
                                    <Label htmlFor="Document Name">Document Name</Label>
                                    <Input
                                        type="text"
                                        id="document_name"
                                        name="document_name"
                                        placeholder="Enter document name"
                                        
                                    />
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                    <Label htmlFor="documentType">Document Type</Label>

                                    <Select
                                        onValueChange={(value) => {
                                        if (documentTypeRef.current) {
                                            documentTypeRef.current.value = value;
                                        }
                                        }}
                                    >
                                        <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-600">
                                        <SelectValue placeholder="Select document type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="information">Information</SelectItem>
                                        <SelectItem value="document">Document</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <input type="hidden" name="document_type" ref={documentTypeRef} />
                                </div>


                                <div className="flex flex-col gap-[8px]">
                                <Label htmlFor="Issue darte">Issue Date</Label>
                                <Input
                                    type="date"
                                    id="issue_date"
                                    name="issue_date"
                                    placeholder="Enter employee issue date"
                                
                                />
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                <Label htmlFor="Expiry darte">Expiry Date</Label>
                                <Input
                                    type="date"
                                    id="expiry_date"
                                    name="expiry_date"
                                    placeholder="Enter employee expiry date"
                                
                                />
                                </div>
                            </div>
                            {mode === "template" ? (
                                // <Tiptap template={templates[selectedTemplate]()} />
                                // <Tiptap></Tiptap>
                                <div className="w-full lg:w-2/3">
                                    <QuillEditor ref={quillRef} template={templates[selectedTemplate]()}></QuillEditor>
                                </div>
                            
                            ) : (
                                <div className="w-3/4">
                                    <FileUploader
                                        onDrop={handleFileDrop}
                                        accept={{
                                        "image/png": [],
                                        "image/jpeg": [],
                                        "image/jpg": [],
                                        "application/pdf" : []
                                        }}
                                        type="Only support image/pdf file"
                                        label="Drag your document file or"
                                        description="Max 5 MB CSV file is allowed"
                                    />
                                    <input
                                        type="file"
                                        name="document"
                                        // accept=".csv"
                                        ref={fileInputRef}
                                    
                                        hidden
                                    />
                                </div>
                            )}
                        
                            </div>
                            <div className="flex gap-[10px] justify-end">
                                <Link href={`/employee/${employeeId}`}>
                                    <Button className="w-[80px]" variant="outline" size="lg" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                
                            
                                <Button className="w-[80px]" variant="default" type="submit">
                                    
                                Submit
                                

                                </Button>
                                {loading && <div className="flex items-center gap-2 text-blue-600 mt-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <span>Submitting...</span>
                                    </div>
                                    }
                                {success && <p className="text-green-600 mt-2">Document submitted successfully! Redirecting...</p>}
                                {error && <p className="text-red-600 mt-2">There was an error submitting the form.</p>}
                            </div>
                            
                        </form>
                    </Card>
                </div>
            </Sidebar>
        );
    }

