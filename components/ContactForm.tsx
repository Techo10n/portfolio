"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      form.reset()
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Subject"
                  className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="Message"
                  className="w-full min-h-[120px] px-3 py-2 rounded-md bg-foreground/10 border border-foreground/20 text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {submitStatus === "success" && (
          <p className="text-green-400 text-sm">Message sent successfully!</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-foreground/20 border border-foreground/30 text-foreground hover:bg-foreground/30 cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send"} <span className="ml-1">→</span>
        </Button>
      </form>
    </Form>
  )
}
