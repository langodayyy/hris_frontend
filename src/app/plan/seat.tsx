import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Seat = () => {
    return (
        <div className="flex w-full flex-col gap-[30px] mt-[60px] min-h-screen">
            <div className="flex gap-[30px] justify-center">
                <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-primary-200 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                    <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Essential</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 10.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 1 until 50 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
                <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-primary-100 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                       <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Professional</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 15.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 1 until 50 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
                <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-neutral-50 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                       <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Enterprise</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 20.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 1 until 50 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="flex gap-[30px] justify-center">
            <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-primary-200 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                    <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Essential</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 9.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 51 until 100 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
                <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-primary-100 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                       <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Professional</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 14.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 51 until 100 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
                <Card className="py-[0] w-[370px] rounded-[15px] border border-black/15 bg-neutral-50 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
                       <div className="flex flex-col py-[20px] px-[20px] gap-[20px]">
                        <p className="text-3xl font-bold text-secondary-700">Enterprise</p>
                        <p className="font-bold text-4xl text-neutral-900">
                            IDR 18.000<span className="text-sm align-super ml-1">/user/month</span>
                        </p>
                        <p className="font-bold text-sm text-neutral-500">This package for 51 until 100 employee</p>
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Card>
            </div>

        </div>
     
    );
}

export default Seat;