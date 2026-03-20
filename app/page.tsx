import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  let products;
  try {
    products = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 5,
    });
  } catch (error) {
    console.error("Stripe API error:", error);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 pt-20">Under Maintenance</h1>
        <p className="text-neutral-600">We are currently updating our products. Please check back later.</p>
      </div>
    );
  }

  if (!products.data || products.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 pt-20">No Products Available</h1>
        <p className="text-neutral-600">Stay tuned for our latest arrivals!</p>
      </div>
    );
  }

  const heroProduct = products.data[0];

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          {heroProduct.images?.[0] && (
            <Image
              alt={heroProduct.name}
              src={heroProduct.images[0]}
              className="rounded object-cover"
              width={250}
              height={250}
            />
          )}
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}