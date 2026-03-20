import { stripe } from "@/lib/stripe";
import { ProductList } from "@/components/product-list";

export default async function Product() {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
    });

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="bg-white border-b border-neutral-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
                        Our Products
                    </h1>
                    <p className="mt-4 text-xl text-neutral-500">
                        Explore our curated selection of high-quality items.
                    </p>
                </div>
            </header>
            
            <main>
                <ProductList products={products.data} />
            </main>
        </div>
    );
}
