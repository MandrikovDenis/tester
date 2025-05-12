"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useStore } from '@/store/store'; // Import the Zustand store

const FormSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL (e.g., https://example.com).",
  }),
});

export function UrlInputForm() {
  const setUrl = useStore((state) => state.setUrl); // Get the setUrl action from the store

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUrl(data.url); // Update the URL in the Zustand store
    toast({
      title: "URL Updated",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-secondary p-4">
          <code className="text-secondary-foreground">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // Placeholder for triggering AI suggestions or further actions
    console.log("URL submitted:", data.url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Keep the submit button for explicit URL setting if needed, or remove if suggestions trigger automatically */}
        {/* <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
          Set URL
        </Button> */}
      </form>
    </Form>
  );
}
