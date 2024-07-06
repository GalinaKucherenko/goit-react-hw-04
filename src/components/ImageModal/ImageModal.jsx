import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ isOpen, closeModal, imageUrl, altDescription }) {
    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            className={css.overlay}
            overlayClassName={css.overlay}
            contentLabel="Image Modal"
        >
            <img src={imageUrl} alt={altDescription} className={css.content} />
        </Modal>
    );
}

