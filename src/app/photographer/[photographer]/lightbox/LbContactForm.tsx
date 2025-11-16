'use client';

import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function LbContactForm({ isOpen, onClose, children }: LightboxProps) {
  // Bloquer le scroll du body quand ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="lbcontact__overlay" onClick={onClose}>
      <div className="lbcontact__content" onClick={(e) => e.stopPropagation()}>
        <button className="lbcontact__close" onClick={onClose}>
          <span>
            <Image 
              src='/close_form.svg'
              width={42}
              height={42}
              alt='bouton de fermeture du formulaire de contact'
            />
          </span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}