import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-2">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-screen w-full object-cover"
        src="/images/auth-image.png"
        alt="auth-image"
      />
      <div className="flex justify-center items-center flex-col">
        <div className="space-y-[60px]">
          {/* Header */}
          <div className="space-y-5">
            <div className="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="rune-logo" />
              <h1 className="text-4xl font-poppins font-light gap-2.5">Rune</h1>
            </div>
            <p className="font-light text-sm">
              powered by <span className="font-normal">IBM&copy; watsonX</span>
            </p>
          </div>
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </main>
  );
  {
    /* Navigation */
  }
};

export default AuthLayout;
