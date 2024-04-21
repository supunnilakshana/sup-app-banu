import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/item-type">Item Type</Link>
      <Link href="/item">Item</Link>
      <Link href="/store">Store</Link>
      <Link href="/measurement">Measurement</Link>
      <Link href="/store-item">Store Item</Link>
    </div>
  );
}
