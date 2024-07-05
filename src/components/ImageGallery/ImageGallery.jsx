import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery(items) {
    return (
        <div>
            <ul>
                <li>
                    <ImageCard {items} />
                </li>
            </ul>
        </div>
    )
}