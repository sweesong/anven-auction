import { Navbar } from "@/components/navbar";
import { Spacer } from "@nextui-org/spacer";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Navbar />
        <main className="flex flex-col gap-4 container mx-auto max-w-[1140px] pt-4 px-6 flex-grow">
            {children}
        </main>
        <Spacer y={10} />
        <footer className="w-full flex items-center justify-center mt-10 py-3 gap-1">
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">Anven Foo</p>
        </footer>
        </>
    );
}