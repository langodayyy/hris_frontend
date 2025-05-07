import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Order() {
    return (
        <Sidebar title="">
            <div className="flex px-[150px] mt-[50px] w-full justify-center">
                <div className="flex flex-col w-[650px] bg-transparent whitespace-normal">
                    <p className="pt-[50px] px-[30px] text-5xl font-medium text-primary-900">Select Package Name</p>
                    <p className="pt-[24px] px-[30px] text-2xl font-bold text-primary-900">Upgrade to Professional</p>
                    <a href="/subscription" className="px-[30px] text-info-500 hover:underline">
                        Change Plan
                    </a>
                    <p className="pt-[24px] px-[30px] font-bold text-lg text-primary-900">Billing Period</p>
                    <div className="flex px-[30px] pt-[8px] w-full gap-[10px]">
                        <Button variant="default" className="flex-1 whitespace-normal">Single Payment - IDR 15.000 / User</Button>
                        <Button variant="outline" className="flex-1 whitespace-normal">Monthly - IDR 14.000 / User</Button>
                    </div>
                    <p className="pt-[24px] px-[30px] font-bold text-lg text-primary-900">Size Matters</p>
                </div>
                <div className="w-[650px]">
                    <Card className="rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] whitespace-normal">
                        <p className="mx-[50px] mt-[26px] text-5xl font-medium text-secondary-700 whitespace-normal">Order Summary</p>
                        <div className="pt-[26px] grid grid-cols-2 gap-y-[20px] text-primary-900 text-lg font-medium mx-[50px] whitespace-normal">
                            <span className="font-medium text-lg text-neutral-500">Package</span>
                            <span className="font-medium text-lg text-neutral-500">: Professional</span>
                            <span className="font-medium text-lg text-neutral-500">Billing Period</span>
                            <span className="font-medium text-lg text-neutral-500">: Single Payment</span>
                            <span className="font-medium text-lg text-neutral-500">Team Size</span>
                            <span className="font-medium text-lg text-neutral-500">: 1 - 50</span>
                            <span className="font-medium text-lg text-neutral-500">Number of Employees</span>
                            <span className="font-medium text-lg text-neutral-500">: 10</span>
                            <span className="font-medium text-lg text-neutral-500">Price per User</span>
                            <span className="font-medium text-lg text-neutral-500">: IDR 15.000</span>
                         
                        </div>
                        <hr className="border-t border-black mx-[50px] mt-[26px]"></hr>
                        <div className="grid grid-cols-2 gap-y-2 text-primary-900 text-lg font-medium mx-[50px] whitespace-normal">
                            <span className="font-medium text-lg text-neutral-500">Subtotal</span>
                            <span className="text-right font-medium text-lg text-neutral-500">IDR 150.000</span>
                          
                            <span className="font-medium text-lg text-neutral-500">Tax</span>
                            <span className="text-right font-medium text-lg text-neutral-500">IDR 0</span>
                          
                        </div>
                        <hr className="border-t border-black mx-[50px]"></hr>
                        <div className="grid grid-cols-2 gap-y-2 text-primary-900 text-lg font-medium mx-[50px] whitespace-normal">
                            <span className="font-bold text-lg text-neutral-900">Total at Renewal</span>
                            <span className="text-right font-bold text-lg text-neutral-900">IDR 150.000</span>
                    
                        </div>
                        <div className="mx-[50px] my-[26px]">
                            <Button variant="default">
                                Continue to Payment
                            </Button>
                        </div>
                      
                    </Card>
                </div>
            </div>
        </Sidebar>
    );
}