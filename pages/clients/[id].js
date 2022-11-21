import React from 'react'

import { useRouter } from 'next/router'
import { data } from '../../data'
import Image from 'next/image'

// this is at the limit (maybe a bit over it) of needing to be divided into components, I hope it remains readable!

export default function Client() {
    const router = useRouter()
    const { id } = router.query

    if (!data[id]) return <div className='text-center pt-28'>This client does not exist!</div>

    const clientData = data[id]
    const idNum = Number(id)

    // these two functions allow you to move between items(pages),
    //  if you go over the length of the array, it will take you to the first one
    //  if you go below 0, it will take you to the last one

    function nextPage() {
     if((idNum + 1 ) >= data.length) router.push('/clients/0');
     else router.push(`/clients/${(idNum + 1 )}`);
    }
    function prevPage() {
        if((idNum - 1 ) < 0) router.push(`/clients/${(data.length - 1 )}`);
        else router.push(`/clients/${(idNum - 1 )}`);
    }

    return (
        <div className='mx-auto max-w-[1100px] px-10 xl:px-0 pb-1'>
            <div className='h-32 flex justify-between items-center mb-20'>
                <div className='flex-1'>
                    <Image src="/logo.png" alt="logo" width={170} height={33} />
                </div>
                <div className='flex-1 flex flex-col items-end space-x-6 md:justify-end md:flex-row '>
                        <div onClick={()=> prevPage()}>Prev Page</div>
                        <div onClick={()=> nextPage()}>Next Page</div>
                </div>
            </div>
            <div className='font-bold mb-10'>
                <h1 className='text-4xl capitalize mb-3'>{clientData.cliente}</h1>

                {/* the data did not include this part so i just used this one */}
                <h2 className='text-3xl mb-8'>{clientData.escenario}</h2>
                {/* not sure what to use here so i used the item n */}
                <h2 className='text-2xl'>Testeador {Number(id) + 1}</h2>
            </div>

            {/* this may seem odd but the iframe now is in 16/9 aspect ratio!! (and 3 pixels more so it doesn't look awkward) */}
            {/* this is a design choice thou, some may appreciate a bit of Y-Padding*/}
            <div className='pt-[57%] relative mb-14'>
                <iframe className='w-full h-full absolute inset-0' src={clientData.linkVideo} scrolling={"no"}
                 allowFullScreen={true} frameBorder="0"/>
            </div>

            <div className='mb-20'>
                <h2 className='text-2xl font-bold mb-8'>Transcripción</h2>
                {/* i made it this way to respect the spacing in the text */}
                <div className='overflow-y-scroll h-60 max-w-2xl px-5 md:px-10' dangerouslySetInnerHTML={{ __html: clientData.transcripcion }}>
                </div>
            </div>
            <div className='mb-20 max-w-[500px]'>
                <h2 className='text-2xl font-bold mb-8'>Tareas</h2>
                <p className='font-medium'>Escenario: {clientData.escenario}</p>
                <div>

                    {/* I limited this to 10 bc 40 is a lot of items and seemed redundant */}
                    {clientData.preguntas.slice(0, 10).map((item, key) => {

                        let fixedText = item.texto.split('\\n').join('<br />');
                        {/* i changed this so i could respect the spacing in the text */ }

                        return (
                            <div key={key} className='p-5 mt-6 border-t border-white font-bold'>

                                <p>Tarea {Number(key) + 1}</p>
                                <p className='mb-5' dangerouslySetInnerHTML={{ __html: fixedText }}></p>
                                {item.respuesta !== "respuesta verbal" && <p>Respuesta: {item.respuesta}</p>}
                                <p className='text-[#f6905c] font-normal'>Duración de la tarea: {item.tiempo}</p>

                            </div>)
                    })
                    }
                </div>
            </div>
        </div>
    )
}

