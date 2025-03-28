interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  addToCartProps: (product: Product) => void;
}

export default function ProductList({ addToCartProps }: ProductListProps) {
  const products: Product[] = [
    { id: 1, name: "Product A", price: 25 },
    { id: 2, name: "Product B", price: 40 },
    { id: 3, name: "Product C", price: 30 },
    { id: 4, name: "Product D", price: 50 },
  ];

  return (
    <div className="w-full rounded-lg bg-gray-800 p-6 md:w-1/2">
      <h2 className="mb-4 text-2xl font-semibold">Products</h2>

      <ul className="flex flex-col gap-y-4 *:gap-x-6">
        {products.map((product) => (
          <li key={product.id} className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="grow text-sm text-gray-400">${product.price}</p>
            <button
              onClick={() => addToCartProps(product)}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
