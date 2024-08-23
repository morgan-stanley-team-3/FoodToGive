'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

{
  /* Custom imports */
}
import { LOGIN_TYPES, QUERY_PARAM_NAME } from '@/lib/login/constants';

const loginScheme = z.object({
  email: z.string().email('Email is required'),
  password: z.string(),
});

const donorSignupScheme = z
  .object({
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password cannot be empty'),
    confirm_password: z.string().min(1, 'Password cannot be empty'),
    agency: z.string().min(1, 'Donor Name cannot be empty'),
    poc_name: z.string().min(1, 'Point of Contact Name should not be empty'),
    poc_phone: z.string().min(1, 'Phone number is required'),
  })
  .refine((input) => {
    input.password === input.confirm_password,
      {
        message: `Passwords don't match!`,
        path: ['confirm_password'],
      };
  });

const beneficiarySignupScheme = z
  .object({
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password cannot be empty'),
    confirm_password: z.string().min(1, 'Password cannot be empty'),
    agency: z.string().min(1, 'Donor Name cannot be empty'),
    poc_name: z.string().min(1, 'Point of Contact Name should not be empty'),
    poc_phone: z.string().min(1, 'Phone number is required'),
  })
  .refine((input) => {
    input.password === input.confirm_password,
      {
        message: `Passwords don't match!`,
        path: ['confirm_password'],
      };
  });

const adminSignupScheme = z
  .object({
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password cannot be empty'),
    confirm_password: z.string().min(1, 'Password cannot be empty'),
  })
  .refine((input) => {
    input.password === input.confirm_password,
      {
        message: `Passwords don't match!`,
        path: ['confirm_password'],
      };
  });

function Cards() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = searchParams.get(QUERY_PARAM_NAME) ?? '';
  const formToRender = LOGIN_TYPES.includes(form) ? form : LOGIN_TYPES[0];

  const donorSignupForm = useForm<z.infer<typeof donorSignupScheme>>({
    resolver: zodResolver(donorSignupScheme),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const beneficiarySignupForm = useForm<
    z.infer<typeof beneficiarySignupScheme>
  >({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const adminSignupForm = useForm<z.infer<typeof adminSignupScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmitDonorSignup(
    values: z.infer<typeof donorSignupScheme>
  ) {
    sessionStorage.setItem('currentUser', '');
    router.push('/dashboard');

    //   form.setError('root', {
    //     type: 'manual',
    //     message: 'The provided credentials are invalid. Please try again.',
    //   });
  }

  async function onSubmitBeneficiarySignup(
    values: z.infer<typeof beneficiarySignupScheme>
  ) {
    sessionStorage.setItem('currentUser', '');
    router.push('/dashboard');

    //   form.setError('root', {
    //     type: 'manual',
    //     message: 'The provided credentials are invalid. Please try again.',
    //   });
  }

  async function onSubmitAdminSignup(
    values: z.infer<typeof adminSignupScheme>
  ) {
    sessionStorage.setItem('currentUser', '');
    router.push('/dashboard');

    //   form.setError('root', {
    //     type: 'manual',
    //     message: 'The provided credentials are invalid. Please try again.',
    //   });
  }

  function updateUrlHistory(render: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('type', render);
    window.history.replaceState(null, '', `?${newParams.toString()}`);
  }

  return (
    <section className='h-screen w-screen flex flex-row items-center'>
      <div className='container mx-auto my-auto'>
        <div className='flex flex-col items-center p-4 mt-8 mb-8'>
          <Tabs defaultValue={formToRender} className='w-[50%] min-w-[412px]'>
            {/* Define the list of tabs */}
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger
                value='donor'
                onClick={() => {
                  updateUrlHistory('donor');
                }}
              >
                Donor Sign Up
              </TabsTrigger>
              <TabsTrigger
                value='beneficiary'
                onClick={() => {
                  updateUrlHistory('beneficiary');
                }}
              >
                Beneficiary Sign Up
              </TabsTrigger>
              <TabsTrigger
                value='admin'
                onClick={() => {
                  updateUrlHistory('admin');
                }}
              >
                Admin Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Define the contents of the tabs here */}
            {/* Donor card */}
            <TabsContent value='donor'>
              <Card className='w-[100%] mt-4 min-w-[412px]'>
                <CardHeader>
                  <CardTitle className='pt-4'>Donor Sign Up</CardTitle>
                  <CardDescription className='pt-2 pb-2'>
                    Fill in your personal details and some information about you
                    to get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...donorSignupForm}>
                    <form
                      onSubmit={donorSignupForm.handleSubmit(
                        onSubmitDonorSignup
                      )}
                      className='flex flex-col gap-4'
                    >
                      <FormField
                        control={donorSignupForm.control}
                        name='email'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder='Email...' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={donorSignupForm.control}
                        name='password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={donorSignupForm.control}
                        name='confirm_password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Confirm Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={donorSignupForm.control}
                        name='agency'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Donor Agency Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Agency Name...'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <p className='mt-4'>Contact Details</p>
                      <FormField
                        control={donorSignupForm.control}
                        name='poc_name'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Point of Contact Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder='Name...' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={donorSignupForm.control}
                        name='poc_phone'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>
                                Point of Contact Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Phone Number...'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {donorSignupForm.formState.errors.root && (
                        <p className='text-red-600'>
                          {donorSignupForm.formState.errors.root.message}
                        </p>
                      )}

                      {donorSignupForm.formState.isSubmitSuccessful && (
                        <p className='text-green-600'>
                          Sign Up Success! Redirecting...
                        </p>
                      )}

                      <Button className='w-full mt-4' type='submit'>
                        Sign Up
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className='flex flex-col items-center mt-4'>
                  <p className='text-sm'>
                    Already have an account? Click{' '}
                    <Link href='/login?type=donor' className='underline'>
                      here
                    </Link>{' '}
                    to login!
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Beneficiary card */}
            <TabsContent value='beneficiary'>
              <Card className='w-[100%] mt-4 min-w-[412px]'>
                <CardHeader>
                  <CardTitle className='pt-4'>Beneficiary Sign Up</CardTitle>
                  <CardDescription className='pt-2 pb-2'>
                    Enter in your email and password to your Beneficiary account
                    to get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...beneficiarySignupForm}>
                    <form
                      onSubmit={beneficiarySignupForm.handleSubmit(
                        onSubmitBeneficiarySignup
                      )}
                      className='flex flex-col gap-4'
                    >
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='email'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder='Email...' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='confirm_password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Confirm Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='agency'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Donor Agency Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Agency Name...'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <p className='mt-4'>Contact Details</p>
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='poc_name'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Point of Contact Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder='Name...' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={beneficiarySignupForm.control}
                        name='poc_phone'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>
                                Point of Contact Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type='tel'
                                  placeholder='Phone Number...'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {beneficiarySignupForm.formState.errors.root && (
                        <p className='text-red-600'>
                          {beneficiarySignupForm.formState.errors.root.message}
                        </p>
                      )}

                      {beneficiarySignupForm.formState.isSubmitSuccessful && (
                        <p className='text-green-600'>
                          Sign Up Success! Redirecting...
                        </p>
                      )}

                      <Button className='w-full mt-4' type='submit'>
                        Sign Up
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className='flex flex-col items-center mt-4'>
                  <p className='text-sm'>
                    Already have an account? Click{' '}
                    <Link href='/login?type=beneficiary' className='underline'>
                      here
                    </Link>{' '}
                    to login!
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Admin card */}
            <TabsContent value='admin'>
              <Card className='w-[100%] mt-4 min-w-[412px]'>
                <CardHeader>
                  <CardTitle className='pt-4'>Admin Sign Up</CardTitle>
                  <CardDescription className='pt-2 pb-2'>
                    Enter in your Administrator credentials to get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...adminSignupForm}>
                    <form
                      onSubmit={adminSignupForm.handleSubmit(
                        onSubmitAdminSignup
                      )}
                      className='flex flex-col gap-4'
                    >
                      <FormField
                        control={adminSignupForm.control}
                        name='email'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder='Email...' />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={adminSignupForm.control}
                        name='password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={adminSignupForm.control}
                        name='confirm_password'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='Confirm Password...'
                                  type='password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {adminSignupForm.formState.errors.root && (
                        <p className='text-red-600'>
                          {adminSignupForm.formState.errors.root.message}
                        </p>
                      )}

                      {adminSignupForm.formState.isSubmitSuccessful && (
                        <p className='text-green-600'>
                          Sign Up Success! Redirecting...
                        </p>
                      )}

                      <Button className='w-full mt-4' type='submit'>
                        Sign Up
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className='flex flex-col items-center mt-4'>
                  <p className='text-sm'>
                    Already have an admin account? Click{' '}
                    <Link href='/login?type=admin' className='underline'>
                      here
                    </Link>{' '}
                    to login!
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Suspense>
      <Cards />
    </Suspense>
  );
}
