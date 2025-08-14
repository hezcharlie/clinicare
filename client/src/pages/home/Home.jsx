import useMetaArgs from "@/hooks/useMeta"
import { RiCalendarScheduleLine, RiFileTextLine, RiUserHeartLine } from "@remixicon/react";

export default function Home() {
  useMetaArgs({
    title: "Home, Clinicare",
    description: "Welcome to clinicare",
    keywords: "Health,Clinic, Hospital & Maternity",
  });
  return (
    <main>
      {/* Section-1-Welcome/Login */}
      <section className="bg-[#E5EDFF] ">
        <div className="mx-auto py-5 px-4 min-h-[450px] max-w-[600px] flex flex-col justify-end items-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-center md:text-4xl">Welcome to</h1>
          <h1 className="text-6xl font-bold md:text-7xl text-[#FF5703]">Clinicare</h1>
        </div>
        <p className="text-zinc-800 text-center mt-5 text-xl lg:text-[22px] lg:w-[767px]">Manage your hospital operations, patient records, and more with our powerful hospital management system.</p>
        <div className="flex gap-4 items-center mt-8">
          <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/account/signup">New Patient</a>
          </button>
          <button className="btn btn-outline">
            <a href="/account/signin">Login to Clinicare</a>
          </button>
        </div>
      </div>
      {/* section-2-hospitalHero-img */}
      <div className="">
        <div className="mx-auto flex justify-center px-4 md:h-[500px] w-[867px] mt-10">
          <img src="\public\ipadHospitalHero-img.png" alt="hospitalHero-img" className="w-full h-full" />
        </div> 
      </div>
      </section>
      {/* section-3-Dedication-Portal */}
      <section className="container mx-auto my-10 py-5 px-8">
       <div className="space-y-3 flex flex-col items-center">
        <div className="space-y-4 pt-6 pb-5">
           <h1 className="text-2xl font-bold md:text-3xl text-center lg:text-[36px] text-[#130A5C]">Key Features to Simplify Hospital Management</h1>
        <p className="text-center text-[22px] w-[853px]">Comprehensive tools designed to enhance efficiency, improve patient care, and streamline hospital operations.
</p>
        </div>
       </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-8">
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
          <div className="w-[300px] pl-2">
             <div className="py-4">
             <RiCalendarScheduleLine size={40}  className="text-blue-500 p-1.5 bg-[#D5E2FF] rounded-full"/>
           </div>
            <h2 className="text-[24px] font-semibold mb-2">Appointment Scheduling</h2>
            <p className="text-zinc-800 mb-4">Let patients book and reschedule appointments easily online with real-time availability and automated confirmations.</p>
          </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
            <div className="w-[300px] pl-2">
              <div className="py-4 ">
                <RiUserHeartLine size={40} className="text-[#F805F8] bg-[#FFD7FF] rounded-full p-1.5"/>
              </div>
              <h2 className="text-[24px] font-semibold mb-2">Doctor & Department Management</h2>
            <p className="text-zinc-800 mb-4">Manage staff availability, departmental organization, and resource allocation efficiently.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
            <div className="w-[300px] pl-2">
              <div className="py-4">

              </div>
              <h2 className="text-[24px] font-semibold mb-2">Analytics Dashboard</h2>
            <p className="text-zinc-800 mb-4">Get real-time insights into bookings, patient visits, revenue, and operational performance.
</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
            <div className="w-[300px] pl-2">
              <div className="py-4">

              </div>
              <h2 className="text-[24px] font-semibold mb-2">Billing & Invoicing</h2>
            <p className="text-zinc-800 mb-4">Generate invoices, track payments, and integrate with insurance providers seamlessly.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
            <div className="w-[300px] pl-2">
              <div className="py-4">

              </div>
              <h2 className="text-[24px] font-semibold mb-2">Automated Reminders</h2>
            <p className="text-zinc-800 mb-4">Send SMS and email alerts for appointments, follow-ups, and medication reminders automatically.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-white rounded-lg flex flex-col items-start justify-center border-[0.2px] border-gray-500 p-4 h-[250px] shadow-lg">
           <div className="w-[300px] pl-2">
            <div className="py-4">
              < RiFileTextLine size={40} className="text-[#F805F8] bg-[#FFD7FF] rounded-full p-1.5" />
            </div>
             <h2 className="text-[24px] font-semibold mb-2">Electronic Medical Records</h2>
            <p className="text-zinc-800 mb-4">Store, access, and update patient records securely with comprehensive digital health documentation.</p>
           </div>
          </div>
        </div>
      </section>
      {/* section-4-Enterprise-Features */}
      <section className="container mx-auto py-5 px-4 my-14" id="features">
        <h1 className="text-2xl font-bold text-center md:text-3xl">Enterprise-Grade Features</h1>
        <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-8">
          <div className="col-span-12 md:col-span-4 rounded-lg flex flex-col items-center justify-center border-[0.2px] border-gray-500 h-[250px] text-center shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-2">Hospital Operations</h2>
          <p className="text-zinc-800 mb-4">Streamline daily operations, resource allocation, and staff management.</p>
        </div>
        <div className="col-span-12 md:col-span-4 rounded-lg flex flex-col items-center justify-center border-[0.2px] border-gray-500 h-[250px] text-center shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-2">Data Security</h2>
          <p className="text-zinc-800 mb-4">HIPAA-Compliant security measures to protect sensitive patient data.</p>
        </div>
        <div className="col-span-12 md:col-span-4 rounded-lg flex flex-col items-center justify-center border-[0.2px] border-gray-500 h-[250px] text-center shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-2">Clinical Management</h2>
          <p className="text-zinc-800 mb-4">Comprehensive tools for patient care and clinical workflow optimization.</p>
        </div>
        </div>
      </section>
      {/* section-5-ClinicDashboard-img */}
      <section className="mx-auto py-5 px-4 md:h-[600px] w-[90%] mt-10">
        <img src="/public/clinicare-dashboard.png" alt="clinicareDashboard-img" className="w-full h-full border-[0.2px] border-gray-500 rounded-lg shadow-lg" />
      </section>
      {/* section-6-HospitalRecord */}
      <section className="bg-blue-500 py-5 px-4 my-20">
        <div className="mx-auto container grid grid-cols-12 gap-4 lg:gap-8">
          <div className="col-span-12 md:col-span-3 text-white flex flex-col items-center text-center justify-center h-[100px] md:h-[200px] p-4">
            <h1 className="text-4xl font-bold mb-2">100+</h1>
            <p>Hospitals</p>
          </div>
          <div className="col-span-12 md:col-span-3 text-white flex flex-col items-center text-center justify-center h-[100px] md:h-[200px] p-4">
            <h1 className="text-4xl font-bold mb-2">1000+</h1>
            <p>Healthcare Professionals</p>
          </div>
          <div className="col-span-12 md:col-span-3 text-white flex flex-col items-center text-center justify-center h-[100px] md:h-[200px] p-4">
            <h1 className="text-4xl font-bold mb-2">1M+</h1>
            <p>Patients Served</p>
          </div>
          <div className="col-span-12 md:col-span-3 text-white flex flex-col items-center text-center justify-center h-[100px] md:h-[200px] p-4">
            <h1 className="text-4xl font-bold mb-2">99.9%</h1>
            <p>System Uptime</p>
          </div>
        </div>
      </section>
      {/* section-GetStarted */}
      <section className="mx-auto py-5 px-4 mt-20">
          <div className="flex flex-col justify-center items-center text-center gap-4 pb-10">
            <h1 className="text-3xl font-bold">Ready to Transform Your Hospital Experience?</h1>
            <p>Take advantage of our awesome services and enjoy rich healthcare experience at the comfort of your home.</p>
            <button className="btn bg-blue-500 text-white hover:bg-blue-600">
              <a href="/account/sign-up">Started</a>
            </button>
          </div>
        </section>
    </main>
  )
}
