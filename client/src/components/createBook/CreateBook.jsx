import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postProduct } from '../../redux/services/postProduct';
import bookValidation from './bookValidation';

import { Button, Label, TextInput, Alert } from 'flowbite-react';
import CreatableSelect from 'react-select/creatable';

const CreateBook = () => {
  const dispatch = useDispatch();

  const generos = ['Ficción', 'Aventura', 'Acción']; // cuando estén disponibles las rutas para hacer
  const autores = ['max', 'un random']; // GET de géneros, autores y editoriales,
  const editoriales = ['editorial1', 'editorial2']; // voy a reemplazar esto.

  const [bookData, setBookData] = useState({
    title: '',
    price: '',
    image: '',
    releaseDate: '',
    autor: [],
    genre: [],
    synopsis: '',
    editorial: '',
    ISBNname: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    image: '',
    autor: '',
    genre: '',
    synopsis: '',
    editorial: '',
    ISBNname: '',
  });

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      bookValidation({
        ...bookData,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSelectChangeGenre = (e) => {
    const updatedGenres = e.map((selectedGenre) => selectedGenre.value);
    setBookData({ ...bookData, genre: updatedGenres });
  };

  const handleSelectChangeAutor = (e) => {
    const updatedAutores = e.map((selectedAutor) => selectedAutor.value);
    setBookData({ ...bookData, autor: updatedAutores });
  };

  const handleSelectChangeEditorial = (e) => {
    setBookData({ ...bookData, editorial: e.value });
  };

  const genresNotInArray = bookData.genre.filter(
    (genre) => !generos.includes(genre),
  );

  const autoresNotInArray = bookData.autor.filter(
    (autor) => !autores.includes(autor),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(postProduct(bookData));
      if (response && response.status === 201) {
        alert('Libro creado exitosamente.');
      } else {
        console.error('Error creando el libro.');
      }
    } catch (error) {
      console.error('Error creando libro:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Título" />
        </div>
        <TextInput
          id="title"
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          color={errors.title ? 'failure' : 'white'}
          helperText={errors.title ? errors.title : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Precio"></Label>
        </div>
        <TextInput
          id="price"
          type="text"
          name="price"
          pattern="\d+(\.\d{1,2})?"
          value={bookData.price}
          onChange={handleChange}
          color={errors.price ? 'failure' : 'white'}
          helperText={errors.price ? errors.price : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Imagen"></Label>
        </div>
        <TextInput
          type="url"
          name="image"
          id="image"
          value={bookData.image}
          onChange={handleChange}
          color={errors.image ? 'failure' : 'white'}
          helperText={errors.image ? errors.image : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="releaseDate" value="Fecha de lanzamiento"></Label>
        </div>
        <TextInput
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={bookData.releaseDate}
          color="white"
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="autor" value="Autor" />
        </div>
        <CreatableSelect
          id="autor"
          onChange={handleSelectChangeAutor}
          isMulti
          options={autores.map((autor) => ({ value: autor, label: autor }))}
        />
        {autoresNotInArray.length > 0 && (
          <Alert color="info">
            <span className="font-medium">Cuidado!</span> Los siguientes autores
            no se encuentran actualmente en la base de datos, por lo tanto se
            crearán: {autoresNotInArray.join(', ')}.
          </Alert>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="genre" value="Género" />
        </div>
        <CreatableSelect
          id="genre"
          onChange={handleSelectChangeGenre}
          isMulti
          options={generos.map((genre) => ({ value: genre, label: genre }))}
        />
        {genresNotInArray.length > 0 && (
          <Alert color="info">
            <span className="font-medium">Cuidado!</span> Los siguientes géneros
            no se encuentran actualmente en la base de datos, por lo tanto se
            crearán: {genresNotInArray.join(', ')}.
          </Alert>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="synopsis" value="Sinopsis" />
        </div>
        <TextInput
          type="text"
          name="synopsis"
          id="synopsis"
          value={bookData.synopsis}
          onChange={handleChange}
          color={errors.synopsis ? 'failure' : 'white'}
          helperText={errors.synopsis ? errors.synopsis : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="editorial" value="Editorial" />
        </div>
        <CreatableSelect
          id="editorial"
          onChange={handleSelectChangeEditorial}
          options={editoriales.map((editorial) => ({
            value: editorial,
            label: editorial,
          }))}
        />
        {!editoriales.includes(bookData.editorial) > 0 &&
          bookData.editorial !== '' && (
            <Alert color="info">
              <span className="font-medium">Cuidado!</span> La editorial no se
              encuentra actualmente en la base de datos, por lo tanto se creará.
            </Alert>
          )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="ISBNname" value="ISBN" />
        </div>
        <TextInput
          type="text"
          name="ISBNname"
          id="ISBNname"
          value={bookData.ISBNname}
          onChange={handleChange}
          color={errors.ISBNname ? 'failure' : 'white'}
          helperText={errors.ISBNname ? errors.ISBNname : null}
        />
      </div>

      <Button
        type="submit"
        disabled={
          bookData.genre.length === 0 ||
          bookData.autor.length === 0 ||
          bookData.title === '' ||
          bookData.price === '' ||
          bookData.releaseDate === '' ||
          bookData.editorial === '' ||
          bookData.image === '' ||
          bookData.ISBNname === '' ||
          bookData.synopsis === '' ||
          Object.values(errors).some((error) => error)
        }
      >
        Crear
      </Button>
    </form>
  );
};

export default CreateBook;
