'user client'

import { Card } from "@/components/ui/card";
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
    DialogClose,
    } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const PersonalInformation = () => {
    return (
        <Card className="flex-1 h-full ml-[20px] gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex mx-[20px] justify-between">
                <p className="justify-center text-lg font-medium whitespace-nowrap">Personal Information</p>
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
                                <DialogTitle>Edit Personal Information</DialogTitle>
                                <DialogDescription>
                                    
                                    
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data">
                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="First Name">First Name</Label>
                                                <Input
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="Enter employee first name"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="Last Name">Last Name</Label>
                                                <Input
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Enter employee last name"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="First Name">NIK</Label>
                                                <Input
                                                    type="number"
                                                    id="nik"
                                                    name="nik"
                                                    placeholder="Enter employee NIK"
                                                />
                                            </div>
                                                <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="gender">Gender</Label>
                                                <Select name="gender">
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="birth place">Birth Place</Label>
                                                <Input
                                                    type="text"
                                                    id="birth_place"
                                                    name="birth_place"
                                                    placeholder="Enter employee birth place"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="birth darte">Birth Date</Label>
                                                <Input
                                                    type="date"
                                                    id="birth_date"
                                                    name="birth_date"
                                                    placeholder="Enter employee birth date"
                                                />
                                            </div>
                                        
                                        </div>
                                        <div className="flex gap-[10px]">
                                                <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="Education">Education</Label>
                                                <Select name="education">
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee education" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sd">SD</SelectItem>
                                                        <SelectItem value="smp">SMP</SelectItem>
                                                        <SelectItem value="sma">SMA</SelectItem>
                                                        <SelectItem value="d3">D3</SelectItem>
                                                        <SelectItem value="s1">S1</SelectItem>
                                                        <SelectItem value="s2">S2</SelectItem>
                                                        <SelectItem value="s3">S3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="blood-type">Blood Type</Label>
                                                <Select name="blood_type">
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                    <SelectValue placeholder="Select employee blood type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                    <SelectItem value="a">A</SelectItem>
                                                    <SelectItem value="b">B</SelectItem>
                                                    <SelectItem value="ab">AB</SelectItem>
                                                    <SelectItem value="o">O</SelectItem>
                                                    <SelectItem value="unknown">Unknown</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="maritial-_status">Maritial Status</Label>
                                                <Select name="maritial_status">
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee maritial status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="single">Single</SelectItem>
                                                        <SelectItem value="married">Married</SelectItem>
                                                        <SelectItem value="divorced">Divorced</SelectItem>
                                                        <SelectItem value="widowed">Widowed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="religion">Religion</Label>
                                                <Select name="religion">
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                    <SelectValue placeholder="Select employee religion" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                    <SelectItem value="islam">Islam</SelectItem>
                                                    <SelectItem value="protestant">Christian Protestant</SelectItem>
                                                    <SelectItem value="catholic">Catholic</SelectItem>
                                                    <SelectItem value="hindu">Hindu</SelectItem>
                                                    <SelectItem value="buddha">Buddha</SelectItem>
                                                    <SelectItem value="confucianism">Confucianism</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="citizenship">Citizenship</Label>
                                                <Input
                                                    type="text"
                                                    id="citizenship"
                                                    name="citizenship"
                                                    placeholder="Enter employee citizenship"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Enter employee address"
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
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Full Name</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">John Marston</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>NIK</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">3500000000000000</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Gender</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Male</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Education</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">S1</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Birth Place</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Malang</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Birth Date</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">1 May 1989</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Citizenship</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Malang</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Marital Status</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Single</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Religion</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Islam</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Blood Type</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">A</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Address</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">Jl. Soekarno Hatta No.9, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141</span> 
                </div>
            </div>

        </Card>
    );
    
}

export default PersonalInformation;