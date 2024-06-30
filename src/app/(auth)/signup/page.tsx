import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import { SignupForm } from "./components";

const SignupPage = () => {
  return (
    <>
      <Tabs value="create-account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger asChild value="signin">
            <Link href="/signin">Sign in</Link>
          </TabsTrigger>
          <TabsTrigger value="create-account">
            <Link href="/signup">Create an account</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full">
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
