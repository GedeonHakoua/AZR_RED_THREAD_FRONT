import { Caveat, Lato, Lusitana } from 'next/font/google';

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'], // tu peux préciser les graisses (normal, bold, etc.)
});
export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // tu peux préciser les graisses (normal, bold, etc.)
});
export const lusitana = Lusitana({
    subsets: ['latin'],
    weight: ['400', '700']
})