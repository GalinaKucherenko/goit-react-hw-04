
export default function ImageCard({ image }) {
    return (
        <div>
            <img src={image.url} alt={image.alt_description || 'Image'} />
        </div>
    );
}
