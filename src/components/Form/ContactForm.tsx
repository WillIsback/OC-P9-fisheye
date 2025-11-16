import styles from './form.module.css'
import { sendMail } from '@/actions/contact.action'

export default function ContactForm(){
  return (
    <form action={sendMail} className={styles.contactform}>
      <label htmlFor='prenom'>Prénom</label>
      <input type="text" name="prenom" aria-label='Prénom'></input>
      <label htmlFor='nom'>Nom</label>
      <input type="text" name="nom" />
      <label htmlFor='email'>Email</label>
      <input type="email" name="mail" />
      <label htmlFor='message'>Votre message</label>
      <textarea name='message' />
      <button type="submit" className='btn--primary'>Envoyer</button>
    </form>
  )

}