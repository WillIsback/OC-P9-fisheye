'use server'
 
import { cookies } from 'next/headers'
import { updateNumberOfLikes } from '@/services/prisma.service'
 
export async function incrementLike(mediaId: string, likes: number) {
  // 0. Increment the number of likes
  const incrementedLike = likes + 1;

  // 1. Settings the cookieStore and storing the like for each artistic work
  const cookieStore = await cookies()
  cookieStore.set(`${mediaId}`, `${incrementedLike}`); // storing in cookies session the update number of likes

  // 2. Updating databas with the function updateNumberOfLikes
  updateNumberOfLikes(Number(mediaId), incrementedLike);

  return incrementedLike;

}