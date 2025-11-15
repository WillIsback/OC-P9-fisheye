'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ComponentRef<'dialog'>>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleKeydown = (event: KeyboardEvent) => {
      event.preventDefault();
      if(event.key === "Escape"){
        dialog?.close();
      }
    };
    dialog?.addEventListener("keydown", handleKeydown);
    return () => {
      dialog?.removeEventListener("keydown", handleKeydown);
    };
  },[router]);

  function onDismiss() {
    router.back();
  }


  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <button onClick={onDismiss} className="close-button">
          <Image 
            src='/close_ic.svg'
            width={42}
            height={42}
            alt='button to close modal'
          />
        </button>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}