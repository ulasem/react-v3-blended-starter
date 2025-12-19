import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import { getPhotos } from '../../services/photos';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);
      const fetchedPhotos = await getPhotos(query);
      if (fetchedPhotos.length === 0) {
        toast.error('No found photos');
      }
      setPhotos(fetchedPhotos);
    } catch {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text textAlign="center">Nothing found!</Text>}
          {photos.length > 0 && <PhotosGallery photos={photos} onSelect={setSelectedPhoto} />}
          <Toaster position="top-right" />
          {selectedPhoto && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
