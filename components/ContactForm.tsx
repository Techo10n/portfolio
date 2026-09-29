"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { contactSchema, type ContactInput } from "@/lib/contact-schema"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  async function onSubmit(values: ContactInput) {
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
        setErrorMessage(
          response.status === 429
            ? "Too many messages. Please try again in a few minutes."
            : "Failed to send message. Please try again, or email me directly."
        )
        setSubmitStatus("error")
        return
      }

      setSubmitStatus("success")
      form.reset()
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md" noValidate>
        {/* Honeypot: off-screen and skipped by keyboard and assistive tech; bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
          </label>
        </div>
        <div className="flex flex-col @xl:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Name"
                    aria-label="Name"
                    className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 dark:text-red-400" />
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
                    aria-label="Email"
                    type="email"
                    className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 dark:text-red-400" />
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
                    aria-label="Subject"
                  className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/50"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 dark:text-red-400" />
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
                  aria-label="Message"
                  className="w-full min-h-[120px] px-3 py-2 rounded-md bg-foreground/10 border border-foreground/20 text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 dark:text-red-400" />
            </FormItem>
          )}
        />

        {submitStatus === "success" && (
          <p role="status" className="text-green-700 dark:text-green-400 text-sm">Message sent successfully!</p>
        )}
        {submitStatus === "error" && (
          <p role="alert" className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
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
