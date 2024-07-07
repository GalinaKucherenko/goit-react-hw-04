import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../articles-api";
import css from "./App.module.css";

export default function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [topic, setTopic] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");
    const [modalAltDescription, setModalAltDescription] = useState("");

    useEffect(() => {
        async function getImages() {
            try {
                setLoading(true);
                const data = await fetchImages('picture', 1);
                setImages(data);
            } catch (error) {
                setError("Something seems to have happened, please reload this page!");
            } finally {
                setLoading(false);
            }
        }
        getImages();
    }, []);

    const handleSearch = async (newTopic) => {
        setImages([]);
        setPage(1);
        setTopic(newTopic);
        setError("");
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const openModal = (imageUrl, altDescription) => {
        setModalImageUrl(imageUrl);
        setModalAltDescription(altDescription);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if (topic === '') {
            return;
        }

        async function getImages() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchImages(topic, page);
                setImages((prevImages) => {
                    return [...prevImages, ...data];
                });
            } catch (error) {
                toast.error("ERROR!", { position: 'top-left' });
                setError("Something seems to have happened, please reload this page!");
            } finally {
                setLoading(false);
            }
        }
        getImages();
    }, [page, topic]);

    return (
        <div className={css.container}>
            <SearchBar onSearch={handleSearch} />
            {error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
                    <ImageGallery items={images} onImageClick={openModal} />
                    {images.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
                </>
            )}
            <Loader loading={loading} />
            <Toaster />
            <ImageModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                imageUrl={modalImageUrl}
                altDescription={modalAltDescription}
            />
        </div>
    );
}
