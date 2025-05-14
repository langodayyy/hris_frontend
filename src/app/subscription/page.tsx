'use client'
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CheckIcon from "./checkicon";
import SwitchMenu from "./switch-menu";
import Package from "./package";
import Seat from "./seat";
import { useState } from "react";

export default function Subscription () {
    const [activeMenu, setActiveMenu] = useState("package");
    return (
        <Sidebar title="Subscription">
            <div className="flex flex-col gap-[24px] items-center justify-center w-full">
                <div className="flex flex-col gap-[20px]">
                    <p className="font-extrabold text-7xl text-center text-primary-900">HRIS Pricing Plans</p>
                    <p className="font-normal text-xl text-black/50 text-center w-[599px]">Choose the plan that best suits yout business! This HRIS offers both subscription and pay-as-you-go payment options, available in the following packages:</p>
          
                </div>
                <SwitchMenu activeMenu={activeMenu} onChange={setActiveMenu} />

                    {/* Tampilkan menu berdasarkan pilihan */}
            
                    {activeMenu === 'package' ? (
                        <>
                        {/* Card untuk Package */}
                            <Package></Package>
                        </>
                    ) : (
                        <>
                        {/* Card untuk Seat */}
                            <Seat></Seat>
                        </>
                    )}
               
            </div>
        </Sidebar>
    );
}