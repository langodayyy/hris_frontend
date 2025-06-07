"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CheckIcon from "./checkicon";
import SwitchMenu from "./switch-menu";
import Package from "./package";
import Seat from "./seat";
import { useState } from "react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "../../../components/ui/pricing";

export default function Subscription() {
  const [activeMenu, setActiveMenu] = useState("package");
  return (
    <Sidebar title="Change Plan">
      <div className="flex flex-col gap-[15px] text-center ">
        {/* title */}
        <span className="text-[40px] font-bold font-sans text-neutral-900">
          Change your plan and unlock more HRIS's canAccess.
        </span>

        <div className="flex justify-center">
          {/* tabs option */}

          <Tabs defaultValue="kurang" className="w-[400px] h-fit ">
            <TabsList className="h-15">
              <TabsTrigger
                className="text-lg h-full w-full cursor-pointer "
                value="kurang"
              >
                For employees{" < "}50
              </TabsTrigger>
              <TabsTrigger
                className="text-lg h-full w-full cursor-pointer "
                value="lebih"
              >
                For employees 50+
              </TabsTrigger>
            </TabsList>

            {/* price for employee < 50 */}
            <TabsContent value="kurang">
              <div className="flex items-start justify-center gap-5 mt-10">
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Standart"
                    imageUrl="/images/price01.png"
                    currency="IDR"
                    price="10.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Do check clock for their employee (HR)",
                    ]}
                    canNotAccess={[
                      "Export/Import employee data (HR)",
                      "Add employee documents (HR)",
                      "Overtime access (HR)",
                      "Edit profile (Employee)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                     alertDialog={true}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Professional"
                    imageUrl="/images/price02.png"
                    currency="IDR"
                    price="15.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Export/Import employee data (HR)",
                      "Do check clock for their employee (HR)",
                      "Add employee documents (HR)",
                      "Edit profile (Employee)",
                    ]}
                    canNotAccess={[
                      "Overtime access (HR)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                     alertDialog={true}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Enterprise"
                    imageUrl="/images/price03.png"
                    currency="IDR"
                    price="20.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Export/Import employee data (HR)",
                      "Do check clock for their employee (HR)",
                      "Edit profile (Employee)",
                      "Add employee documents (HR)",
                      "Overtime access (HR)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                     alertDialog={true}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="lebih">
              <div className="flex flex-row items-start justify-center gap-5 mt-10">
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Standart"
                    imageUrl="/images/price01.png"
                    currency="IDR"
                    price="9.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Do check clock for their employee (HR)",
                    ]}
                    canNotAccess={[
                      "Export/Import employee data (HR)",
                      "Add employee documents (HR)",
                      "Overtime access (HR)",
                      "Edit profile (Employee)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                     alertDialog={true}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Professional"
                    imageUrl="/images/price02.png"
                    currency="IDR"
                    price="14.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Export/Import employee data (HR)",
                      "Do check clock for their employee (HR)",
                      "Add employee documents (HR)",
                      "Edit profile (Employee)",
                    ]}
                    canNotAccess={[
                      "Overtime access (HR)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                     alertDialog={true}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Enterprise"
                    imageUrl="/images/price03.png"
                    currency="IDR"
                    price="18.000"
                    description="Intuitive, world-class support tools for growing teams"
                    canAccess={[
                      "Access to employee page (HR)",
                      "Export/Import employee data (HR)",
                      "Do check clock for their employee (HR)",
                      "Edit profile (Employee)",
                      "Add employee documents (HR)",
                      "Overtime access (HR)",
                      "Do check clock (Employee)",
                    ]}
                    buttonText="Change Plan"
                   alertDialog={true}
                    
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Sidebar>
  );
}
