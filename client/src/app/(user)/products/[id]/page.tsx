"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart, Minus, Plus, Share2, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// This would typically come from your API based on the product ID
const getProductData = (id: string) => {
  const products = {
    "1": {
      id: 1,
      title: "Wireless Headphones",
      price: 129.99,
      originalPrice: 159.99,
      description:
        "Experience premium sound quality with these wireless headphones. Featuring active noise cancellation, long battery life, and comfortable ear cushions for extended listening sessions.",
      longDescription: `
        <p>Immerse yourself in your favorite music with our premium Wireless Headphones. These headphones combine cutting-edge technology with superior comfort to deliver an exceptional audio experience.</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Active Noise Cancellation: Block out external noise for immersive listening</li>
          <li>40-hour Battery Life: Enjoy your music for longer between charges</li>
          <li>Premium Sound Quality: 40mm dynamic drivers deliver rich, detailed audio</li>
          <li>Comfortable Design: Memory foam ear cushions and adjustable headband</li>
          <li>Quick Charge: Get 5 hours of playback from just 10 minutes of charging</li>
          <li>Bluetooth 5.0: Stable connection with a range of up to 10 meters</li>
          <li>Built-in Microphone: Crystal-clear calls with noise reduction technology</li>
        </ul>
        
        <h3>What's in the Box:</h3>
        <ul>
          <li>Wireless Headphones</li>
          <li>USB-C Charging Cable</li>
          <li>3.5mm Audio Cable</li>
          <li>Carrying Case</li>
          <li>User Manual</li>
        </ul>
      `,
      specifications: [
        { name: "Brand", value: "SoundMaster" },
        { name: "Model", value: "WH-1000" },
        { name: "Color", value: "Black" },
        { name: "Connectivity", value: "Bluetooth 5.0, 3.5mm jack" },
        { name: "Battery Life", value: "Up to 40 hours" },
        { name: "Charging Time", value: "2 hours" },
        { name: "Weight", value: "250g" },
        { name: "Warranty", value: "1 year" },
      ],
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: { id: 1, name: "Electronics" },
      stock: 15,
      rating: 4.5,
      reviews: [
        {
          id: 1,
          user: "John D.",
          rating: 5,
          date: "2023-03-15",
          title: "Best headphones I've ever owned",
          comment:
            "The sound quality is amazing and the noise cancellation works perfectly. Battery life is impressive too!",
        },
        {
          id: 2,
          user: "Sarah M.",
          rating: 4,
          date: "2023-02-28",
          title: "Great sound, slightly tight fit",
          comment:
            "Sound quality is excellent and battery life is as advertised. The only downside is they're a bit tight on my head after a few hours of use.",
        },
        {
          id: 3,
          user: "Michael P.",
          rating: 5,
          date: "2023-02-10",
          title: "Worth every penny",
          comment:
            "These headphones have exceeded my expectations. The noise cancellation is perfect for my commute and the sound is crisp and clear.",
        },
      ],
      relatedProducts: [2, 3, 5],
    },
    "2": {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      description:
        "Track your fitness goals, receive notifications, and more with this feature-packed smart watch. Water-resistant design with a vibrant touch display.",
      longDescription: `
        <p>Stay connected and track your health with our advanced Smart Watch. This versatile wearable device combines fitness tracking, notifications, and smart features in a sleek, water-resistant design.</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Health Monitoring: Track heart rate, sleep, stress, and blood oxygen levels</li>
          <li>Fitness Tracking: Monitor steps, calories, and over 100 workout modes</li>
          <li>1.4" AMOLED Display: Vibrant touchscreen with always-on option</li>
          <li>Water Resistant: 5ATM rating for swimming and showering</li>
          <li>Battery Life: Up to 14 days on a single charge</li>
          <li>Smart Notifications: Receive calls, messages, and app alerts</li>
          <li>Built-in GPS: Accurate tracking of outdoor activities</li>
        </ul>
      `,
      specifications: [
        { name: "Brand", value: "TechFit" },
        { name: "Model", value: "SW-200" },
        { name: "Color", value: "Black" },
        { name: "Display", value: '1.4" AMOLED' },
        { name: "Battery Life", value: "Up to 14 days" },
        { name: "Water Resistance", value: "5ATM" },
        { name: "Connectivity", value: "Bluetooth 5.0, GPS" },
        { name: "Compatibility", value: "iOS 12.0+, Android 7.0+" },
      ],
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: { id: 1, name: "Electronics" },
      stock: 8,
      rating: 4.8,
      reviews: [
        {
          id: 1,
          user: "Emily R.",
          rating: 5,
          date: "2023-04-02",
          title: "Amazing fitness companion",
          comment:
            "This watch has transformed my fitness routine. The tracking is accurate and the battery life is incredible!",
        },
        {
          id: 2,
          user: "David K.",
          rating: 4,
          date: "2023-03-18",
          title: "Great features, app needs work",
          comment:
            "The watch itself is excellent with tons of useful features. The companion app could use some improvements in terms of user interface.",
        },
      ],
      relatedProducts: [1, 3, 5],
    },
  }

  return products[id as keyof typeof products] || null
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button className="bg-rose-600 hover:bg-rose-700">Return to Home</Button>
        </Link>
      </div>
    )
  }

  // Get related products data
  const relatedProducts = product.relatedProducts.map((id) => getProductData(id.toString())).filter(Boolean)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-rose-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.id}`} className="hover:text-rose-600">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-rose-600" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)} (
                {Math.round((1 - product.price / product.originalPrice) * 100)}%)
              </div>
            )}
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="h-10 w-14 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button className="flex-1 bg-rose-600 hover:bg-rose-700">Add to Cart</Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-gray-500">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">30 Day Returns</p>
                <p className="text-gray-500">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b mb-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-gray-700 space-y-4">
            <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </TabsContent>
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex py-2 border-b">
                  <span className="font-medium w-1/3">{spec.name}</span>
                  <span className="text-gray-600 w-2/3">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Based on {product.reviews.length} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              <Separator />

              {product.reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{review.title}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{review.user}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <Separator />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
              <Link href={`/products/${relatedProduct.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link href={`/products/${relatedProduct.id}`} className="hover:underline">
                  <h3 className="font-medium line-clamp-1">{relatedProduct.title}</h3>
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 font-semibold">${relatedProduct.price.toFixed(2)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

