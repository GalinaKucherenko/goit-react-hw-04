import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../articles-api";

export default function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, serError] = useState(false);

    useEffect(() => {
        async function getImages() {
            try {
                setLoading(true);
                const data = await fetchImages('picture');
            setImages(data);
            } catch (error) {
                serError(true);
            } finally {
                setLoading(false);
            }
        }
        getImages();
    }, []);
    

    return (
        <div>
            {error && <ErrorMessage message={error} />}
            {images.length > 0 && <ImageGallery items={images} />}
            <ImageModal /> 
            <LoadMoreBtn />
            {loading && <Loader audio={loading} />}
            <SearchBar/>
        </div>
    )
}