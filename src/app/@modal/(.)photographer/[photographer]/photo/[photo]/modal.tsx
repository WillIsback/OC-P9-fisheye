'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ComponentRef<'dialog'>>(null);
  const [mounted, setMounted] = useState(false);



  useEffect(() => {
    setMounted(true);
    dialogRef.current?.showModal();
  }, []);

  function onDismiss() {
    dialogRef.current?.close();
    router.back();
  }

  if (!mounted) return null;

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className="close-button">
          <Image 
            src='/close_ic.svg'
            width={42}
            height={42}
            alt='button to close modal'
          />
        </button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}