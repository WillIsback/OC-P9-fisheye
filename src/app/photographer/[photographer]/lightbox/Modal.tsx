'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import LbMedia from './LbMedia';
import { SortCategory, Picture } from '@/types/types';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Modal({
  picture,
  nextMediaId,
  prevMediaId,
  sort,
}: {
  readonly picture: Picture | null,
  readonly nextMediaId: number,
  readonly prevMediaId: number,
  readonly sort : SortCategory,
}) {
  const router = useRouter();
  const dialogRef = useRef<React.ComponentRef<'dialog'>>(null);
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    console.log('Modal useEffect - dialogRef:', dialogRef.current);
    dialogRef.current?.showModal();
  }, []);

  if (!isMounted) return null

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
            <LbMedia 
                picture={picture}
                nextMediaId={nextMediaId} 
                prevMediaId={prevMediaId}
                sort={sort}
                dialogRef={dialogRef}
            />
        </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}