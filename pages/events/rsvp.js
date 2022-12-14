import Form from "@/components/Form";

export default function rsvp() {
  return (
    <div>
      <div className="bg-gray-700 grid md:grid-cols-2 grid-cols-1 place-items-center w-full h-screen gap mb-5">
        <div>
          {/* .form input {
    width: 100%;
    height: 40px;
    padding: 5px;
  } */}
          <label htmlFor="name" className="block">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value=""
            className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="host" className="block">
            Host
          </label>
          <input
            type="text"
            name="host"
            id="host"
            value=""
            className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="venue" className="block ">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            id="venue"
            value=""
            className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="address" className="block">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value=""
            className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="date" className="block">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value=""
            className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="time" className="block">
            Time
          </label>
          <input
            type="text"
            name="time"
            id="time"
            value="{values.time}"
            className="w-full p-1 h-10 shadow appearance-none border border-solid  text-black rounded-lg"
          />
        </div>
      </div>
      <div>
        <label htmlFor="description">Event Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          value=""
          className="shadow appearance-none border border-solid text-black rounded-lg w-full h-36"
        ></textarea>
      </div>
    </div>
  );
}
