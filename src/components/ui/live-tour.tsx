import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";


export default function ResetTourButton() {
  const [open, setOpen] = useState(false);

  const resetJoyride = () => {
    // Hapus semua key terkait Joyride dari localStorage
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key?.startsWith("hasSeenJoyride_") ||
        key?.startsWith("joyride_shown_")
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Tampilkan AlertDialog
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    location.reload(); // Reload halaman setelah dialog ditutup
  };

  return (
    <>
      <div className="fixed bottom-9 left-9 bg-white ">
        <Button
          className="rounded-full p-2"
          variant={"icon"}
          onClick={resetJoyride}
          title="Reset Live Tour"
        >
        <Image src="/images/live-tour.svg" alt="" width={24} height={24}></Image>
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Live Tour </AlertDialogTitle>
            <AlertDialogDescription>
             Live Tour has been reset. You can now start the tour again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-fit" onClick={handleCloseDialog}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
