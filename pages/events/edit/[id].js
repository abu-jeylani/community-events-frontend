import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import { parseCookies } from "@/helpers/index";

import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
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
    <Layout title="Add New Event">
      <Link
        href="#"
        onClick={() => {
          router.back();
        }}
        className="text-black"
      >
        Go Back
      </Link>
      <h1>Edit Event</h1>
      <ToastContainer
        position="top-center"
        theme="colored"
        closeOnClick={true}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="host">Host</label>
            <input
              type="text"
              name="host"
              id="host"
              value={values.host}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
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
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} alt="picture" height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary btn-icon"
        >
          <FaImage /> Set Image
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
