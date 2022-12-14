import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { FaImage } from "react-icons/fa";
import { parseCookies } from "@/helpers/index";
import Button from "@/components/Button";

import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    name: evt.data.attributes.name,
    description: evt.data.attributes.description,
    venue: evt.data.attributes.venue,
    address: evt.data.attributes.address,
    host: evt.data.attributes.host,
    date: evt.data.attributes.date,
    time: evt.data.attributes.time,
  });

  let imageUrl;

  try {
    imageUrl = evt.attributes.image.data.attributes.formats.medium.url;
  } catch (error) {
    imageUrl = null;
  }

  const [imagePreview, setImagePreview] = useState(imageUrl ? imageUrl : null);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.data.attributes.slug}`);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`);
    const data = await res.json();
    const imageUrl =
      data.data.attributes.image.data.attributes.formats.thumbnail.url;
    setImagePreview(imageUrl);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <div
        onClick={() => {
          router.back();
        }}
      >
        <Button title="Go Back" />
      </div>

      <h1 className="mt-6 text-white text-md font-extrabold">Edit Event</h1>
      <ToastContainer
        position="top-center"
        theme="colored"
        closeOnClick={true}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8 mb-5">
          <div>
            <label htmlFor="name" className="block">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className=" w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
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
              value={values.host}
              onChange={handleInputChange}
              className=" w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
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
              value={values.venue}
              onChange={handleInputChange}
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
              value={values.address}
              onChange={handleInputChange}
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
              value={values.date}
              onChange={handleInputChange}
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
              value={values.time}
              onChange={handleInputChange}
              className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
            className="shadow appearance-none border border-solid text-black rounded-lg w-full h-36"
          ></textarea>
        </div>
        <input
          type="submit"
          value={"Update Event"}
          className="block w-full text-white shadow-sm shadow-slate-700 text-xs hover:bg-slate-700 px-4 py-4 rounded-2xl"
        />
      </form>
      <div className="mt-1">
        {" "}
        {imagePreview ? (
          <Image src={imagePreview} alt="picture" height={100} width={170} />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )}
      </div>

      <div className="mt-2 mb-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-slate-900 mt-2 rounded-xl px-3 hover:bg-slate-700 shadow-sm shadow-gray-400"
        >
          <FaImage className="mt-2 mx-12" /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.data.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();
  const token = parseCookies(req);

  return {
    props: {
      evt: evt,
      token: token.token,
    },
  };
}
