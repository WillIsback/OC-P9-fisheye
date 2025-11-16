'use client';

import { useState } from 'react';
import LbContactForm from 'app/photographer/[photographer]/lightbox/LbContactForm';
import ContactForm from '../Form/ContactForm';

export default function BtnContact({name}: {readonly name: string}){
    const [isOpen, setIsOpen] = useState(false);

    return (
    <>
        <button type="button" className={`btn--primary`} onClick={()=> setIsOpen(true)}>Contactez-moi</button>
        <LbContactForm isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2>Contactez-moi<br/>{name}</h2>
            <ContactForm />
      </LbContactForm>
    </>
    )
}