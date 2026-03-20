import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/product-details";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    if (!product) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}