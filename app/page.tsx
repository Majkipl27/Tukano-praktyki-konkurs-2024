import TukanTomek from "@/components/TukanTomek";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-poppins font-bold">Wycieczka po dżungli</h1>
      <h2 className="text-2xl font-poppins font-bold">Z tukanem Tomkiem</h2>
      <TukanTomek />
    </main>
  );
}
