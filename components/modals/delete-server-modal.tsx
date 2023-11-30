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
import { deleteServer } from "@/lib/actions/delete-server";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { isOpen, onClose: closeModal, type, data: modalData } = useModal();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = modalData;

  const [isHandlingDelete, setIsHandlingDelete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Prefetch the root page
    router.prefetch("/");
  }, [router]);

  const handleDelete = async () => {
    try {
      setIsHandlingDelete(true);
      await deleteServer(server!.id);
      closeModal();
      // Do a fast client-side transition to the already prefetched root page
      router.replace("/");
    } catch (error) {
      console.log("Error");
    } finally {
      setIsHandlingDelete(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to do this? <br />
            <span className='text-indigo-500 font-semibold'>
              {server?.name}
            </span>
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isHandlingDelete}
              onClick={closeModal}
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              disabled={isHandlingDelete}
              onClick={handleDelete}
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
