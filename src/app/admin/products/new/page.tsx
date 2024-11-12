'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from "react-dom"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AddProduct from './../../_actions/addProduct';
import Loading from './../../../../components/Loading';


export default function AdminProducts() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  const [formState, formAction] = useFormState(AddProduct, { success: false, message: '' })


  if (isLoading) return <Loading/>


  
  return (
    <div className="container mx-auto px-4 py-8 ">
    
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>  Add New Product</CardTitle>
            <CardDescription>Enter the details for the new product</CardDescription>
          </CardHeader>
          <CardContent>
            <form  action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name"  />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea rows={1} id="description" name="description"  />
              </div>
              <div>
                <Label htmlFor="price">Price (in cents) 100 = 1$ | 1000 = 10$ |10000 = 100$</Label>
                <Input type="number" id="price" name="price"  min={0} max={100000}/>
              </div>
              <div>
                <Label htmlFor="file">Product File</Label>
                <Input type="file" id="file" name="file"  />
              </div>
              <div>
                <Label htmlFor="image">Product Image</Label>
                <Input type="file" id="image" name="image" accept="image/*"  />
              </div>
              <SubmitButton />
            </form>
            {formState.message && (
              <Alert variant={formState.success ? "default" : "destructive"} className="mt-4">
                <AlertTitle>{formState.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{formState.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
   

    <Button type="submit" disabled={pending}>
         <div className={""}>
      {pending ? "Saving..." : "Save Product"}
      </div>
    </Button>
  )
}