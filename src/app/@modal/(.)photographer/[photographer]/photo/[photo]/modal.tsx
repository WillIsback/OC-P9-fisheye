'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ComponentRef<'dialog'>>(null);
  const [mounted, setMounted] = useState(false);
  const params = useParams<{ photographer: string; photo: string }>()


  useEffect(() => {
    setMounted(true);
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }
  function goLeft() {
    const newPhotoId = `${(Number(params.photo) - 1)}`;
    router.push(`/photographer/${params.photographer}/photo/${newPhotoId}`);
  }

  function goRight() {
    const newPhotoId = `${(Number(params.photo) + 1)}`;
    router.push(`/photographer/${params.photographer}/photo/${newPhotoId}`);
  }

  if (!mounted) return null;
  console.log("useparam in modal = ",params)

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <button onClick={goLeft} className="modal__btn_nav">
          <span>
            <Image 
              src='/modal_chevron_left.svg'
              width={42}
              height={42}
              alt='button to close modal'
            />
          </span>
        </button>
        {children}
      <button onClick={goRight} className="modal__btn_nav">
          <span>
            <Image 
              src='/modal_chevron_right.svg'
              width={42}
              height={42}
              alt='button to close modal'
            />
          </span>
        </button>
        <button onClick={onDismiss} className="close-button">
          <span>
            <Image 
              src='/close_ic.svg'
              width={42}
              height={42}
              alt='button to close modal'
            />
          </span>
        </button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}