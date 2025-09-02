'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function ProductCounter({quantity}: {quantity:number|undefined}) {
    const [counter, setcounter] = useState(0)
    return (
        <div>
            <Button variant={'destructive'} onClick={()=>{
                setcounter(counter - 1)
            }}>-</Button>
            <span className='px-2'>{counter}</span>
            <Button variant={'default'} className='bg-blue-600' onClick={() => {
                if(counter<quantity!)
                setcounter(counter + 1)
            }
            }>+</Button>
        </div>
    )
}
