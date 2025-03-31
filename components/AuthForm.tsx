"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
import { toast, Toaster } from "react-hot-toast"; // Import toast components

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        dateOfBirth: data.dateOfBirth,
        ssn: data.ssn,
        email: data.email,
        password: data.password,
      };

      if (type === "sign-up") {
        const newUser = await signUp(userData);

        if (!newUser) {
          toast.error("User already exists! Please sign in.");
          return;
        } else {
          setUser(newUser);
          toast.success("Account created successfully!");
        }
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          toast.success("Signed in successfully!");
          router.push("/");
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <Toaster /> {/* Ensures toast notifications show up */}
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            DJE Bank
          </h1>
        </Link>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      type="select"
                      placeholder="Select your state"
                      options={[
                        { value: "AL", label: "Alabama" },
                        { value: "AK", label: "Alaska" },
                        { value: "AZ", label: "Arizona" },
                        { value: "AR", label: "Arkansas" },
                        { value: "CA", label: "California" },
                        { value: "CO", label: "Colorado" },
                        { value: "CT", label: "Connecticut" },
                        { value: "DE", label: "Delaware" },
                        { value: "FL", label: "Florida" },
                        { value: "GA", label: "Georgia" },
                        { value: "HI", label: "Hawaii" },
                        { value: "ID", label: "Idaho" },
                        { value: "IL", label: "Illinois" },
                        { value: "IN", label: "Indiana" },
                        { value: "IA", label: "Iowa" },
                        { value: "KS", label: "Kansas" },
                        { value: "KY", label: "Kentucky" },
                        { value: "LA", label: "Louisiana" },
                        { value: "ME", label: "Maine" },
                        { value: "MD", label: "Maryland" },
                        { value: "MA", label: "Massachusetts" },
                        { value: "MI", label: "Michigan" },
                        { value: "MN", label: "Minnesota" },
                        { value: "MS", label: "Mississippi" },
                        { value: "MO", label: "Missouri" },
                        { value: "MT", label: "Montana" },
                        { value: "NE", label: "Nebraska" },
                        { value: "NV", label: "Nevada" },
                        { value: "NH", label: "New Hampshire" },
                        { value: "NJ", label: "New Jersey" },
                        { value: "NM", label: "New Mexico" },
                        { value: "NY", label: "New York" },
                        { value: "NC", label: "North Carolina" },
                        { value: "ND", label: "North Dakota" },
                        { value: "OH", label: "Ohio" },
                        { value: "OK", label: "Oklahoma" },
                        { value: "OR", label: "Oregon" },
                        { value: "PA", label: "Pennsylvania" },
                        { value: "RI", label: "Rhode Island" },
                        { value: "SC", label: "South Carolina" },
                        { value: "SD", label: "South Dakota" },
                        { value: "TN", label: "Tennessee" },
                        { value: "TX", label: "Texas" },
                        { value: "UT", label: "Utah" },
                        { value: "VT", label: "Vermont" },
                        { value: "VA", label: "Virginia" },
                        { value: "WA", label: "Washington" },
                        { value: "WV", label: "West Virginia" },
                        { value: "WI", label: "Wisconsin" },
                        { value: "WY", label: "Wyoming" },
                      ]}
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      maxLength={5}
                      placeholder="e.g 10210"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="BVN (SSN)"
                      maxLength={4}
                      placeholder="e.g 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
