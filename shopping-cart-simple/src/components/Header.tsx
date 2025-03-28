interface HeaderProps {
  totalItems: number;
}

export default function Header({ totalItems }: HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-lg bg-gray-800 p-6 text-white">
      <h1 className="text-2xl font-bold">Shoppping Cart</h1>
      <p className="rounded-full bg-amber-600 px-4 py-1 text-lg font-semibold text-white">
        {totalItems} {totalItems > 1 ? "Items" : "item"}
      </p>
    </header>
  );
}
