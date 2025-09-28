"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission here
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-4">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </div>
              <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormControl>
                  <Input placeholder="Message" {...field} />
                </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Send  <span className="ml-1">→</span></Button>
      </form>
    </Form>
  )
}