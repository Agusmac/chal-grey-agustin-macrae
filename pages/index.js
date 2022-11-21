import { useRouter } from 'next/router'
import { useEffect } from 'react'

// import { data } from '../data'

export default function Home() {
  
  const router = useRouter()

  // the pagination is made with the next router
  // this is a simple loader that redirects you to the page of the first item of the array

  // Using the index of the array is not optimal, but the id was the same on both items

  // another option was to use the idVideo, and getting the desired item on the page using filtering the array

    useEffect(() => {
      setTimeout(() => {
        router.push('/clients/0')
      }, 600);
    }, [router])

  return (
   
      <div className='absolute inset-0'>
      <h1 className='text-center mt-[15vh]'>Redirecting to first page...</h1>
        <div className="loader"></div>
      </div>
  )
}
