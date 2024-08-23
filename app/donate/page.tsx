"use client"; 

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Donate = () => {

  const cookedFormSchema = z.object({
    foodName: z.string().min(2, {
      message: "Food name must be at least 2 characters.",
    }),
    timePrepared: z.string().nonempty({
      message: "Date and Time of Preparation is required.",
    }),
    specialHandling: z.string(),
    numberOfServings: z.number().min(1, {
      message: "Number of servings must be at least 1.",
    }),
    consumeByTiming: z.string().nonempty({
      message: "Consume By Timing is required."
    }), 
    foodImages: z.array(z.instanceof(File)),
    deliveryMethod: z.string(),
    pickUpTime: z.string().optional(), 
    pickUpLocation: z.string().optional(), 
    dropOffTime: z.string().optional()
  });

  const nonCookedFormSchema = z.object({
    foodName: z.string().min(2, {
      message: "Food name must be at least 2 characters.",
    }),
    expiryDate: z.string().nonempty({
      message: "Expiry Date is required.",
    }),
    foodCategory: z.string().nonempty({
      message: "Food Category is required.",
    }),
    specialHandling: z.string(),
    quantity: z.number().min(1, { 
      message: "Quantity of food must be at least 1."
    }),
    foodImages: z.array(z.instanceof(File)),
    deliveryMethod: z.string(),
    pickUpTime: z.string().optional(), 
    pickUpLocation: z.string().optional(), 
    dropOffTime: z.string().optional()
  });

  const cookedForm = useForm<z.infer<typeof cookedFormSchema>>({
    resolver: zodResolver(cookedFormSchema),
    defaultValues: {
      foodName: "",
      timePrepared: "",
      consumeByTiming: "",
      specialHandling: "",
      numberOfServings: 0,
      foodImages: []
    },
  });

  const nonCookedForm = useForm<z.infer<typeof nonCookedFormSchema>>({
    resolver: zodResolver(nonCookedFormSchema),
    defaultValues: {
      foodName: "",
      expiryDate: "",
      foodCategory: "",
      specialHandling: "",
      quantity: 0,
      foodImages: []
    },
  });

  function onSubmit(values: any) {

    // make api call to save donation details in mongodb 
    if (foodType === "Cooked Food") { 
      cookedForm.reset({
        foodName: "",
        timePrepared: "",
        specialHandling: "", 
        numberOfServings: 0, 
        deliveryMethod: ""
      })
    } else { 
      nonCookedForm.reset({
        foodName: "",
        expiryDate: "",
        foodCategory: "",
        specialHandling: "",
        quantity: 0,
        deliveryMethod: ""
      });
      setSelectedCategory(""); 
    }

  }
  const [selectedCategory, setSelectedCategory] = useState("");
  const [foodType, setFoodType] = useState("Non-Cooked Food");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
      // cookedForm.setValue("foodImages", files); // Store files in the form state
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">FoodToGive</div>
        <nav className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="/about" className="text-gray-700 hover:text-gray-900">About Us</a>
          <a href="/donate" className="text-gray-700 hover:text-gray-900">Donate</a>
          <a href="/account" className="text-gray-700 hover:text-gray-900">Account</a>
        </nav>
      </header>


      {/* Form Content */}
      <section className="bg-white rounded-lg shadow-lg p-12 mb-12 flex justify-center">
        <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-2">Donate Food</h1>
        <p className="text-sm text-gray-700 mb-7">Help us make a difference, one meal at a time. Share your food today!</p>

        <div className="flex justify-center space-x-4 mb-6">

          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              foodType === "Non-Cooked Food" 
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFoodType("Non-Cooked Food")}
          >
            Non-Cooked Food
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              foodType === "Cooked Food" 
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFoodType("Cooked Food")}
          >
            Cooked Food
          </button>
          
        </div>

        {foodType === "Cooked Food" ? (
          <Form key="cookedForm" {...cookedForm}>
            <form onSubmit={cookedForm.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-s mx-auto">

              {/* Information Card */}
              <div className="bg-green-100 p-9 rounded-lg shadow-lg">
                <p className="text-gray-700 mb-2">
                  To better protect businesses from liability for any deaths or health issues resulting from the consumption of cooked food donated under certain conditions, kindly provide us with the following:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-2">
                  <li>Details on how to ensure the food remains safe, such as specific defrosting or storing instructions</li>
                  <li>Time limit for consuming the food</li>
                </ul>
                <br></br>
                <p className="text-gray-700">
                  Please also take all reasonable measures to comply with food safety and hygiene requirements. This is in line with the <a href="https://sso.agc.gov.sg/Bills-Supp/22-2024/Published/20240702?DocDate=20240702" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Good Samaritan Food Donation Bill</a>.
                </p>
              </div>
              <FormField
                control={cookedForm.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Name</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={cookedForm.control}
                name="timePrepared"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date and Time of Preparation</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cookedForm.control}
                name="consumeByTiming"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consume By Timing</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cookedForm.control}
                name="numberOfServings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Servings</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} className="w-full shadow-sm" />
                    </FormControl>
                    <FormDescription>This does not have to be accurate. An estimate will do!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
        

              <FormField
                control={cookedForm.control}
                name="foodImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                    {previewImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {previewImages.map((src, index) => (
                          <Image
                            key={index}
                            src={src}
                            alt={`Food preview ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={cookedForm.control}
                name="specialHandling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Storage/Handling Requirements</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                  control={cookedForm.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Delivery Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal">Pickup by us</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="selfDeliver" />
                            </FormControl>
                            <FormLabel className="font-normal">I will deliver</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {cookedForm.watch("deliveryMethod") === "pickup" && (
                  <>
        
                    <FormField
                      control={cookedForm.control}
                      name="pickUpLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={cookedForm.control}
                      name="pickUpTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Pickup Time</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {cookedForm.watch("deliveryMethod") === "selfDeliver" && (
                  <>
                    <FormField
                      control={cookedForm.control}
                      name="dropOffTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drop Off Time</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>Our address is 218 Pandan Loop, Level 6, Singapore 128408. We are open from 9.30am - 6pm from Mondays to Fridays and 10am - 5pm on Saturdays. </FormDescription>

                        </FormItem>
                      )}
                    />
                  </>
                )}

              <div className="flex justify-end"><Button type="submit">Submit</Button></div>
            </form>
          </Form>
        ) : (

          <Form key="nonCookedForm" {...nonCookedForm}>
            <form onSubmit={nonCookedForm.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-s mx-auto">
              <FormField
                control={nonCookedForm.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Name</FormLabel>
                    <FormControl>
                      <Input className="w-full shadow-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={nonCookedForm.control}
                name="foodCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          field.onChange(value); // Updates the form state
                        }}
                      >
                        <SelectTrigger className="w-full shadow-sm">
                          <SelectValue placeholder="Select Food Type" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Canned Food">Canned Food</SelectItem>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Dry Goods">Dry Goods</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={nonCookedForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity of Items</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} className="w-full shadow-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={nonCookedForm.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Before Date</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={nonCookedForm.control}
                name="foodImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                    {previewImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {previewImages.map((src, index) => (
                          <Image
                            key={index}
                            src={src}
                            alt={`Food preview ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={nonCookedForm.control}
                name="specialHandling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Storage/Handling Requirements</FormLabel>
                    <FormControl>
                      <Input className="shadow-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                  control={nonCookedForm.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Delivery Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal">Pickup by us</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="selfDeliver" />
                            </FormControl>
                            <FormLabel className="font-normal">I will deliver</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {nonCookedForm.watch("deliveryMethod") === "pickup" && (
                  <>
                    <FormField
                      control={nonCookedForm.control}
                      name="pickUpLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={nonCookedForm.control}
                      name="pickUpTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Pickup Time</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {nonCookedForm.watch("deliveryMethod") === "selfDeliver" && (
                  <>
                    <FormField
                      control={nonCookedForm.control}
                      name="dropOffTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drop Off Time</FormLabel>
                          <FormControl>
                            <Input className="shadow-sm" type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>Our address is 218 Pandan Loop, Level 6, Singapore 128408. We are open from 9.30am - 6pm from Mondays to Fridays and 10am - 5pm on Saturdays. </FormDescription>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              <div className="flex justify-end"><Button type="submit">Submit</Button></div>
    
            </form>
          </Form>
        )}
        </div>
          
    </section>

    </div>
    
  )

}

export default Donate;
