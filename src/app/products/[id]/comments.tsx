'use client'
import { addComment } from '../[id]/actions'
import { Comment, Error } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'


export default function Comments({ comments, productId }: { comments: Comment[] | null, productId: number }) {
    const [comment, setComment] = useState('')
    const [starOnechecked, setstarOnechecked] = useState(false)
    const [starTwochecked, setstarTwochecked] = useState(false)
    const [starThreechecked, setstarThreechecked] = useState(false)
    const [starFourchecked, setstarFourchecked] = useState(false)
    const [starFivechecked, setstarFivechecked] = useState(false)
    const [isDialogOpen, setisDialogOpen] = useState(false)
    const { user, isLoaded } = useUser(); // ✅ client-side
    const router=useRouter()

    const addCommentWithdata = addComment.bind(null, { rating: starFivechecked ? 5 : starFourchecked ? 4 : starThreechecked ? 3 : starTwochecked ? 2 : starOnechecked ? 1 : 0, productId, userId: user?.id, username: user?.username })
    const [state, formAction, isPending] = useActionState(addCommentWithdata, {
        errors: {} as Error,
        submitted: false
    })
    useEffect(() => {
        if (state.submitted && Object.keys(state.errors).length === 0) {
            setisDialogOpen(false)
            toast.success("Your comment has been added")
            setComment('')
            setstarOnechecked(false)
            setstarTwochecked(false)
            setstarThreechecked(false)
            setstarFourchecked(false)
            setstarFivechecked(false)
            router.refresh()
        }
        if (state.errors.msg) {
            toast.error(state.errors.msg)
        }
    }, [state])

    return (
        <div className='px-3'>
            <div className="flex items-center justify-between p-4">
                <h2 className='text-2xl font-bold'>Comments</h2>
                <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>

                    <DialogTrigger asChild>

                        {isLoaded ? <Button variant="secondary" className=''>add comment</Button> : null}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>add your comment</DialogTitle>
                        </DialogHeader>
                        {user ? <form action={formAction}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Input id="comment" name="comment" placeholder='your review' onChange={e => setComment(e.target.value)} />
                                    {state.errors.commentText && <p className='text-red-500'>{state.errors.commentText}</p>}
                                </div>
                                <div className="grid gap-3">
                                    <Label>your rating</Label>
                                    {state.errors.rating && <p className='text-red-500'>{state.errors.rating}</p>}
                                    <div className='flex items-center'>
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const checkedStars =
                                                starFivechecked ? 5 :
                                                    starFourchecked ? 4 :
                                                        starThreechecked ? 3 :
                                                            starTwochecked ? 2 :
                                                                starOnechecked ? 1 : 0;
                                            return (
                                                <Star
                                                    key={i}
                                                    color='gold'
                                                    fill={i < checkedStars ? 'gold' : 'none'}
                                                    onClick={() => {
                                                        setstarOnechecked(i >= 0);
                                                        setstarTwochecked(i >= 1);
                                                        setstarThreechecked(i >= 2);
                                                        setstarFourchecked(i >= 3);
                                                        setstarFivechecked(i >= 4);
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <button type="submit" disabled={isPending}>{!isPending ? 'Submit' : <div className='animate-bounce w-4 h-4 border-4 rounded-full border-black'></div>}</button>
                            </DialogFooter>
                        </form> : <p>you have to log in to add a comment</p>}

                    </DialogContent>

                </Dialog>
            </div>

            <div className='flex flex-col gap-1'>
                {(comments?.length) ? comments?.map(comment => (
                    <Card key={comment.id} className='w-full-[calc(100%-1rem)] bg-gray-200 m-4 p-1!'>
                        <CardContent className="flex-col items-start justify-start p-6 ">
                            <div className='flex gap-2 items-center mb-2'>
                                <p className='font-bold text-lg'>{comment.username}</p>
                                <p>2 days ago</p>
                                {Array.from({ length: Number(comment.rating) ?? 0 }).map((_, i) => (
                                    <Star key={i} color='gold' fill='gold' />
                                ))}
                            </div>
                            <p className='text-left text-xl'>{comment.body}</p>
                        </CardContent>
                    </Card>
                )): <div className='p-3 text-gray-600 text-center'>no comment has been made to this product yet</div> }
            </div>
        </div>
    )
}
