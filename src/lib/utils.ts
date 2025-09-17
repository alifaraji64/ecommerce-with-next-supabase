import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "./types"
import { toast } from "sonner"
import { useCart } from "@/app/context/cart-context"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
