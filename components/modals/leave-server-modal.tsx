"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { leaveServer } from "@/lib/actions/leave-server";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data: modalData } = useModal();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = modalData;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Prefetch the root page
    router.prefetch("/");
  }, [router]);

  const handleLeave = async () => {
    try {
      setIsLoading(true);
      await leaveServer(server!.id);
      // Do a fast client-side transition to the already prefetched root page
      router.replace("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Leave Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to leave
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} onClick={onClose} variant='ghost'>
              Cancel
            </Button>
            <Button
              onClick={handleLeave}
              disabled={isLoading}
              variant='primary'
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
