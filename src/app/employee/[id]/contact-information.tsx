'user client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    } from "@/components/ui/dialog"
import PhoneInput from "@/components/ui/phoneInput";


const ContactInformation = () => {
    return (
        <Card className="mr-[20px] gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex mx-[20px] justify-between">
                <p className="justify-center text-lg font-medium whitespace-nowrap">Contact Information</p>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <svg className="!w-[24px] !h-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white !max-w-[726px]">
                            <DialogHeader>
                                <DialogTitle>Edit Contact Information</DialogTitle>
                                <DialogDescription>
                                    
                                    
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data">
                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                 <PhoneInput
                                                                                    placeholder="Enter employee phone number"
                                                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter employee email"
                                                />
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
            
            <div className="flex mx-[20px] gap-[10px]">
                
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Phone Number</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">6212345678909</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Email</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">johnmarston@gmail.com</span> 
                </div>
            </div>
            {/* <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Email</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">johnmarston@gmail.com</span> 
                </div>
            </div> */}
        </Card> 
        
    );
}

export default ContactInformation;