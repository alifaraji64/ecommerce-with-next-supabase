'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function ProductCounter({quantity}: {quantity:number|undefined}) {
    const [counter, setcounter] = useState(0)
    return (
        <div>
            <Button variant={'destructive'} disabled={counter === 0} onClick={()=>{
                if(counter > 0)
                setcounter(counter - 1)
            }}>-</Button>
            <span className='px-2'>{counter}</span>
            <Button variant={'default'} className='bg-blue-600' disabled={counter >= (quantity ?? 0)} onClick={() => {
                if(counter<quantity!)
                setcounter(counter + 1)
            }
            }>+</Button>
        </div>
    )
}
