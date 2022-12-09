import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import ImageUpload from "@/components/ImageUpload";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import { parseCookies } from "@/helpers/index";

import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";

export default function ImageUploadPage({ evt, token }) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(true);

  const imageUploaded = async (e) => {
    router.push(`/events/${evt.data.attributes.slug}`);
  };

  return (
    <Layout title="Upload Image Event">
      <ToastContainer
        position="top-center"
        theme="colored"
        closeOnClick={true}
      />
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

export async function getServerSideProps({ params, req }) {
  const id = params.id;
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();
  const token = parseCookies(req).token;
  return {
    props: { token, evt },
  };
}
