export default function ImageCard({ image, onImageClick }) {
    return (
        <div onClick={() => onImageClick(image.url, image.alt_description || 'Image')}>
            <img src={image.url} alt={image.alt_description || 'Image'} />
        </div>
    );
}
