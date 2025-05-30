'use client'
import Sidebar from "@/components/sidebar";
import PersonalInformation from "./personal-information";
import ContactInformation from "./contact-information";
import EmploymentOverview from "./employment-overview";
import EmployeeDocuments from "./documents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EmployeeDetails(){
    const [status, setStatus] = useState("Active");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleChangeStatus = () => {
        setIsDialogOpen(true);
    };
    return (
        <Sidebar title="Employee Details">
            <div className="flex flex-col gap-[30px]">
                {/* <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                    <div className="w-full mx-[20px] mb-[-10px]">
                            <h2 className="justify-center w-full text-lg font-medium whitespace-nowrap mx-[10px]">Employee Details</h2>
                    </div> */}
                    <div>
                        <Card className="flex-1 gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                       
                            <div className="flex mx-[20px] items-center">
                                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="78" height="78" rx="39" fill="#F3F4F6" />
                                    <mask id="mask0_462_2363" maskUnits="userSpaceOnUse" x="0" y="16" width="78" height="62" mask-type="alpha">
                                        <path d="M78 68.2272V78H0V68.263C4.53684 62.1999 10.4257 57.2791 17.1983 53.8916C23.9709 50.5042 31.4405 48.7436 39.013 48.75C54.951 48.75 69.108 56.4005 78 68.2272V68.2272ZM52.0065 29.2467C52.0065 32.6945 50.6369 36.0011 48.1989 38.4391C45.7609 40.8771 42.4543 42.2467 39.0065 42.2467C35.5587 42.2467 32.2521 40.8771 29.8141 38.4391C27.3761 36.0011 26.0065 32.6945 26.0065 29.2467C26.0065 25.7989 27.3761 22.4923 29.8141 20.0543C32.2521 17.6163 35.5587 16.2467 39.0065 16.2467C42.4543 16.2467 45.7609 17.6163 48.1989 20.0543C50.6369 22.4923 52.0065 25.7989 52.0065 29.2467V29.2467Z" fill="black"/>
                                    </mask>
                                    <g mask="url(#mask0_462_2363)">
                                        <rect width="78" height="78" rx="39" fill="#D1D5DB" />
                                    </g>
                                </svg>
                             
                                <div className="flex flex-col ml-[15px] gap-[10px]">
                                    <p className="font-medium text-base text-black">Employee Name</p>
                                    <p className="font-normal text-base text-black/52">Employee ID</p>
                                </div>
                                <div className="flex gap-[20px] ml-auto items-center">
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="w-fit" size="icon" variant="link">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="!w-[24px] !h-[24px]" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleChangeStatus}>Change Status</DropdownMenuItem>
                                            {/* <DropdownMenuItem>Option 3</DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Change Employee Status</DialogTitle>
                                                <DialogDescription>
                                                    
                                                    
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div>
                                                <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data">
                                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                                        <div className="flex gap-[10px]">
                                                            
                                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                                <Label htmlFor="status">Employee Status</Label>
                                                                <Select value={status} onValueChange={setStatus}>
                                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                                        <SelectValue placeholder="Select employee status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Active">Active</SelectItem>
                                                                        <SelectItem value="Retire">Retire</SelectItem>
                                                                        <SelectItem value="Resign">Resign</SelectItem>
                                                                        <SelectItem value="Fired">Fired</SelectItem>
                                                                    
                                                                    </SelectContent>
                                                                </Select>
                                                                <input type="hidden" name="employee_status" value={status}/>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-[10px] justify-end">
                                                            <div>
                                                                <DialogClose asChild>
                                                                    <Button className="w-[80px]" variant="outline" size="lg">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                            
                                                            <Button className="w-[80px]" variant="default" type="submit">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="flex gap-[15px]">
                                <div className="w-6/10">
                                    <PersonalInformation></PersonalInformation>
                                </div>
                                <div className="flex flex-col w-4/10 gap-[15px]">
                                    <ContactInformation></ContactInformation>
                                    <EmploymentOverview></EmploymentOverview>
                                </div>
                            
                            </div>

                        </Card>
                    </div>     
                {/* </Card> */}
                <EmployeeDocuments></EmployeeDocuments>
             </div>
        </Sidebar>
    );
}