import React from "react";

export default function PatientOnBoard() {
  return (
    <div className="flex items-center justify-center bg-slate-100 pt-10 pb-">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl pb-5">Patients Onboard</h1>
        <div className="bg-white shadow-md rounded-xl p-2 md:p-4 lg:w-[550px] w-[350px]">
          {/* Logo & title */}
          <div className="text-center">
            <p>
              Hello <b>User</b>, Please complete your patient profile{" "}
            </p>
          </div>

          {/* Form */}
          <form>
            <div className="fieldset p-2 grid grid-cols-2 gap-1">
              <div>
                <fieldset className="fieldset">
                  <label className="label">Full name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Full name"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Phone</label>
                  <input
                    type="phone"
                    className="input w-full"
                    placeholder="Phone"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Date of birth</label>
                  <input type="date" className="input w-full" placeholder="" />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    className="border-1 border-base-300 rounded-sm p-3"
                  >
                    <option value="">Male</option>
                    <option value="">Female</option>
                    <option value="">Others</option>
                  </select>
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Blood group</label>
                  <select
                    name="blood-group"
                    id="blood-group"
                    className="border-1 border-base-300 rounded-sm p-3"
                  >
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </fieldset>
              </div>
              <div className="col-span-2">
                <fieldset className="fieldset">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Emergency contact</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Emergency contact"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Emergency contact phone</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Emergency contact phone"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label">Full name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Full name"
                  />
                </fieldset>
              </div>

              <button></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
