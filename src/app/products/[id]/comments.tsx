'use client'
import { addComment, Comment, Error } from '@/app/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import React, { useActionState, useState } from 'react'


export default function Comments({ comments, rating }: { comments: Comment[], rating: number | undefined }) {
    const [comment, setComment] = useState('')
    const [starOnechecked, setstarOnechecked] = useState(false)
    const [starTwochecked, setstarTwochecked] = useState(false)
    const [starThreechecked, setstarThreechecked] = useState(false)
    const [starFourchecked, setstarFourchecked] = useState(false)
    const [starFivechecked, setstarFivechecked] = useState(false)
    const addCommentWithdata = addComment.bind(null, { comment, rating: starOnechecked ? 1 : starTwochecked ? 2 : starThreechecked ? 3 : starFourchecked ? 4 : starFivechecked ? 5 : 0, productId: 1 })
    const [state, formAction, isPending] = useActionState(addCommentWithdata, {
        errors: {} as Error,
    });
    return (
        <div className='px-3'>
            <div className="flex items-center justify-between p-4">
                <h2 className='text-2xl font-bold'>Comments</h2>
                <Dialog>

                    <DialogTrigger asChild>
                        <Button variant="secondary" className=''>add comment</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>add your comment</DialogTitle>
                        </DialogHeader>
                        <form action={formAction}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Input id="comment" name="comment" placeholder='your review' onChange={e => setComment(e.target.value)} />
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
                                <button type="submit">Submit</button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>
            </div>

            <div className='flex flex-col gap-3'>
                {comments.map(comment => (
                    <Card key={comment.id} className='w-full-[calc(100%-1rem)] bg-gray-200 m-4'>
                        <CardContent className="flex-col items-start justify-start p-6 ">
                            <div className='flex gap-2'>
                                <p className='font-bold text-lg'>{comment.name}</p>
                                <p>2 days ago</p>
                                {Array.from({ length: rating ?? 0 }).map((_, i) => (
                                    <Star key={i} color='gold' fill='gold' />
                                ))}
                            </div>
                            <p className='text-left text-xl'>{comment.body}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
