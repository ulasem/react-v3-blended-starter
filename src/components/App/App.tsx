import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import { getPhotos } from '../../services/photos';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Loader from '../Loader/Loader';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
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
      setIsError(true);
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
          {photos.length > 0 && <PhotosGallery photos={photos} />}
          <Toaster position="top-right" />
        </Container>
      </Section>
    </>
  );
}
