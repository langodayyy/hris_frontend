'use client'
import Sidebar from "@/components/sidebar";
import PersonalInformation from "./personal-information";
import ContactInformation from "./contact-information";
import EmploymentOverview from "./employment-overview";
import EmployeeDocuments from "./documents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function EmployeeDetails(){
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
                                    {/* <Button className="w-[100px]" variant="outline" type="submit">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_462_2148)">
                                    <path d="M6.17401 11.3263C6.34814 11.5005 6.55489 11.6387 6.78245 11.733C7.01002 11.8273 7.25393 11.8759 7.50026 11.8759C7.74659 11.8759 7.99051 11.8273 8.21807 11.733C8.44564 11.6387 8.65239 11.5005 8.82651 11.3263L10.8334 9.31938C10.941 9.20037 10.9987 9.04455 10.9946 8.88416C10.9905 8.72378 10.9248 8.57112 10.8113 8.45779C10.6977 8.34447 10.5449 8.27916 10.3845 8.27538C10.2241 8.2716 10.0684 8.32965 9.94964 8.4375L8.12089 10.2669L8.12526 0.625C8.12526 0.45924 8.05941 0.300269 7.9422 0.183058C7.82499 0.065848 7.66602 0 7.50026 0V0C7.3345 0 7.17553 0.065848 7.05832 0.183058C6.94111 0.300269 6.87526 0.45924 6.87526 0.625L6.86964 10.255L5.05089 8.4375C4.93361 8.32031 4.77459 8.2545 4.60879 8.25456C4.443 8.25462 4.28402 8.32054 4.16683 8.43781C4.04963 8.55509 3.98383 8.71412 3.98389 8.87991C3.98395 9.0457 4.04986 9.20468 4.16714 9.32188L6.17401 11.3263Z" fill="currentColor"/>
                                    <path d="M14.375 9.99991C14.2092 9.99991 14.0503 10.0658 13.9331 10.183C13.8158 10.3002 13.75 10.4591 13.75 10.6249V13.1249C13.75 13.2907 13.6842 13.4496 13.5669 13.5668C13.4497 13.6841 13.2908 13.7499 13.125 13.7499H1.875C1.70924 13.7499 1.55027 13.6841 1.43306 13.5668C1.31585 13.4496 1.25 13.2907 1.25 13.1249V10.6249C1.25 10.4591 1.18415 10.3002 1.06694 10.183C0.949732 10.0658 0.79076 9.99991 0.625 9.99991C0.45924 9.99991 0.300269 10.0658 0.183058 10.183C0.065848 10.3002 0 10.4591 0 10.6249L0 13.1249C0 13.6222 0.197544 14.0991 0.549175 14.4507C0.900805 14.8024 1.37772 14.9999 1.875 14.9999H13.125C13.6223 14.9999 14.0992 14.8024 14.4508 14.4507C14.8025 14.0991 15 13.6222 15 13.1249V10.6249C15 10.4591 14.9342 10.3002 14.8169 10.183C14.6997 10.0658 14.5408 9.99991 14.375 9.99991Z" fill="currentColor"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_462_2148">
                                    <rect width="15" height="15" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                        Export
                                    </Button> */}
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
                                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                                            {/* <DropdownMenuItem>Option 3</DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    {/* <Button className="w-fit" size="icon" variant="link">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!w-[24px] !h-[24px]" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </Button> */}
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