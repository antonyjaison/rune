"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signup } from "@/actions/auth.action";

export const SignupForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const handleSubmit = form.handleSubmit((data) => signup(data));

  return (
    <Card className="">
      <CardContent className="p-9">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-fit mt-7"
            >
              Sign in
            </Button>
          </form>
        </Form>
        <div className="py-12 px-8">
          <div className="h-[1px] bg-black/90"></div>
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full py-6"
          variant="outline"
        >
          <FcGoogle size={24} className="mr-2" />
          <span className="text-sm font-medium">Sign in with Google</span>
        </Button>
      </CardContent>
    </Card>
  );
};
