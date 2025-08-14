

export default function ContactUs() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center text-center min-h-[calc(100vh-9rem)]">
        <div className="col-span-12 bg-white p-">
            <img src="/public/Contact-us.svg" alt="contactUs-img" className="w-[100%] mb-4" />
        </div>
        <div className="flex flex-col items-center gap-1">
            <h1 className="md:text-3xl text-2xl font-bold mb-2 ">Contact Us</h1>
            <a href="mailto:clinicare@gmail.com" className="text-zinc-800 hover:text-blue-500 transition-all duration-300">Email: clinicare@gmail.com</a>
            <a href="tel:+234123456789" className="text-zinc-800 hover:text-blue-500 transition-all duration-300">Phone: +234 123 456 789</a>
        </div>
    </div>
  )
}
