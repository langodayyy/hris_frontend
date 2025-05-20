import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CheckIcon from "./checkicon";

const Package = () => {
    return (
        <div className="flex w-full my-[60px] gap-[40px] justify-center">
            <Card className="py-[0] w-[370px] gap-[15px] rounded-[15px] border border-black/15 bg-primary-200 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-col py-[20px] gap-[20px]">
                    <p className="text-5xl font-bold text-secondary-900 text-center">Essential</p>
                    <p className="font-normal text-base text-neutral-500 text-center">Ideal for small businesses</p>
                    <p className="font-bold text-4xl text-neutral-900 text-center">
                        IDR 150.000<span className="text-sm align-super ml-1">/month</span>
                    </p>
                    <div className="border-t border-neutral-500 mx-[30px]"></div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 1</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 2</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 3</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 4</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 5</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>

                </div>

            </Card>
            <Card className="py-[0] w-[370px] gap-[15px] rounded-[15px] border border-black/15 bg-primary-100 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-col py-[20px] gap-[20px]">
                    <p className="text-5xl font-bold text-secondary-900 text-center">Professional</p>
                    <p className="font-normal text-base text-neutral-500 text-center">Suitable for medium sized businesses</p>
                    <p className="font-bold text-4xl text-neutral-900 text-center">
                        IDR 250.000<span className="text-sm align-super ml-1">/month</span>
                    </p>
                    <div className="border-t border-neutral-500 mx-[30px]"></div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 1</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 2</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 3</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 4</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 5</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>

                </div>

            </Card>
            <Card className="py-[0] w-[370px] gap-[15px] rounded-[15px] border border-black/15 bg-neutral-50 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hiddentransition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-col py-[20px] gap-[20px]">
                    <p className="text-5xl font-bold text-secondary-900 text-center">Enterprise</p>
                    <p className="font-normal text-base text-neutral-500 text-center">Suitable for large enterprises</p>
                    <p className="font-bold text-4xl text-neutral-900 text-center">
                        IDR 450.000<span className="text-sm align-super ml-1">/month</span>
                    </p>
                    <div className="border-t border-neutral-500 mx-[30px]"></div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 1</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 2</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 3</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 4</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <p>Feature 5</p>
                        <CheckIcon></CheckIcon>
                    </div>
                    <div className="mx-[30px] flex justify-between">
                        <Button variant="default">
                            Select a Package
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>

                </div>

            </Card>
        </div>
     
    );
};

export default Package;