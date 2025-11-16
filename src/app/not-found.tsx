import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default async function NotFound() {
  return (
    <div className='nf'>
      <h2 className='nf__h2'>Error 404 Page introuvable</h2>
      <p className='nf__p'>Could not find requested resource</p>
      <Link href="/" className='btn--primary'>Return Home</Link>
    </div>
  )
}