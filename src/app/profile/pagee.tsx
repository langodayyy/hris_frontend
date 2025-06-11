'use client'
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/passwordInput";
import FormPhoneInput from "@/components/ui/phoneInput";
import { useState, useCallback, useEffect } from "react";
import ProfileInformation from "./profile";


export default function Profile() {
    const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
    const handleOpenChangePasswordDialog = useCallback(() => {
        setIsHeaderDropdownOpen(false);
        setShowChangePasswordDialog(true);
    }, []);
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);

  function fetchData(): void {
    throw new Error("Function not implemented.");
  }

    return (
        <Sidebar title="">
            <Card className="w-full h-fit px-5 py-7 gap-[15px]">
              <div className="flex flex-row justify-between">
                <span className="px-[10px] text-lg">Profile</span>
    
                {/* Header Profile Dropdown */}
                <DropdownMenu
                  open={isHeaderDropdownOpen}
                  onOpenChange={setIsHeaderDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-fit h-fit"
                      icon={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    ></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit h-fit">
                    <DropdownMenuItem
                      className="w-full h-fit cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                        handleOpenChangePasswordDialog();
                      }}
                    >
                      Change password
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
    
                {/* Change Password Dialog */}
                <Dialog
                  open={showChangePasswordDialog}
                  onOpenChange={setShowChangePasswordDialog}
                >
                  <DialogContent
                    className="sm:max-w-[425px] bg-white"
                    showCloseButton={false}
                  >
                    <AlertDialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </AlertDialogHeader>
                    <div className="grid gap-4 mt-3">
                      <PasswordInput
                        label="Old Password"
                        name="old_password"
                        id="old_password"
                        placeholder="Enter your old password"
                      />
                      <PasswordInput
                        label="New Password"
                        name="new_password"
                        id="new_password"
                        placeholder="Enter your new password"
                      />
                      <PasswordInput
                        label="Confirmation New Password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Enter your new password"
                      />
                    </div>
                    <DialogFooter>
                      <div className="flex flex-row gap-3.5 justify-end mt-4">
                        <DialogClose asChild>
                          <Button variant={"outline"} className="w-fit">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          variant={"default"}
                          className="w-fit h-fit"
                        //   onClick={handleChangePasswordSubmit}
                        >
                          Save
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <ProfileInformation employeeData={undefined} onUpdate={fetchData}></ProfileInformation>
            </Card>
        </Sidebar>
  );
}