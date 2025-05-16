'use client'
import Sidebar from "@/components/sidebar";
import PersonalInformation from "./personal-information";
import ContactInformation from "./contact-information";
import EmploymentOverview from "./employment-overview";
import EmployeeDocuments from "./documents";
import { Card, CardContent } from "@/components/ui/card";

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