export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-semibold tracking-widest">SynapSpace</h1>
        <nav>
          <ul className="flex gap-6 text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer">AI</li>
            <li className="hover:text-black cursor-pointer">Contatti</li>
            <li className="hover:text-black cursor-pointer">Accedi</li>
          </ul>
        </nav>
      </header>

      <section className="mb-20">
        <h2 className="text-5xl font-bold mb-4">Scopri le tue Intelligenze</h2>
        <p className="text-gray-700 max-w-xl">
          Scegli tra le AI specializzate e lascia che lavorino in sinergia per te. Creatività. Studio. Organizzazione. In un solo spazio.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AIBox name="Mentrya" description="Il tuo mentore per lo studio" link="/mentrya" />
        <AIBox name="Scriptor" description="Assistente alla scrittura intelligente" link="/scriptor" />
        <AIBox name="Chronya" description="Gestione del tempo e pianificazione" link="/chronya" />
      </section>

      <footer className="mt-24 text-sm text-gray-500 border-t border-gray-200 pt-6">
        © 2025 SynapSpace. Tutti i diritti riservati.
      </footer>
    </main>
  );
}

function AIBox({ name, description, link }: { name: string; description: string; link: string }) {
  return (
    <a href={link}>
      <div className="bg-black text-white p-6 rounded-2xl hover:scale-[1.03] transition shadow-lg">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </a>
  );
}
