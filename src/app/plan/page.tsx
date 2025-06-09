"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "../../components/ui/pricing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Subscription() {
  const [activeTab, setActiveTab] = useState("kurang");
  // currentPlan hanya menyimpan nama plan yang aktif
  const [currentPlan] = useState({ name: "Ultra" });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"close"}
            className="absolute top-4 right-4 rounded-full p-2 w-12 h-12"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1.00005L1 13M0.999949 1L12.9999 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to cancel the plan change?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will keep your current subscription as it is.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-fit">No</AlertDialogCancel>
            <AlertDialogAction
              className="w-fit"
              onClick={() => window.history.back()}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col gap-[15px] text-center py-10 ">
        {/* title */}
        <span className="text-[40px] font-bold font-sans text-neutral-900">
          Change your plan and unlock more HRIS's features.
        </span>

        <div className="flex justify-center">
          {/* tabs option */}
          <Tabs
            defaultValue={activeTab}
            className="w-[400px] h-fit "
            onValueChange={setActiveTab}
          >
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
                    isCurrentPlan={currentPlan.name === "Standart"}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Premium"
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
                    isCurrentPlan={currentPlan.name === "Premium"}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Ultra"
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
                    isCurrentPlan={currentPlan.name === "Ultra"}
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
                    isCurrentPlan={currentPlan.name === "Standart"}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Premium"
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
                    isCurrentPlan={currentPlan.name === "Premium"}
                  />
                </div>
                <div className="flex justify-center items-center h-fit">
                  <PricingCard
                    title="Ultra"
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
                    isCurrentPlan={currentPlan.name === "Ultra"}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
