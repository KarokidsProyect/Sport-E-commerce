/* eslint-disable no-unused-vars */
const { Products,ReleasedDate,Autor,Editorial,Genre,ISBN } = require("../db");

const createProductController = async (data) => {

    const {title, synopsis, price, image, releaseDate, autor, editorial, genre, ISBNname} = data;

    try {
        
        const [productInstance, created] = await Products.findOrCreate({

            where:{
                title,
            },
            defaults:{
                title,
                synopsis,
                price,
                image
            }

        })

        if(created){

            if(releaseDate){
                const [releaseDateInst,created] = await ReleasedDate.findOrCreate({
                    where:{
                        date:releaseDate,
                    },
                    defaults:{
                        date:releaseDate,
                    },
                })

                await productInstance.setReleasedDate(releaseDateInst);


            }

            //si manda un arreglo lo mapea si no lo agrega de una
            if (autor) {
                if (Array.isArray(autor)) {
                    const autorInstances = await Promise.all(autor.map(async (name) => {
                        const [autorInstance, created] = await Autor.findOrCreate({
                            where: {
                                name,
                            },
                            defaults: {
                                name,
                            }
                        });
                        return autorInstance;
                    }));
                    await productInstance.setAutors(autorInstances);
                } else {
                    const [autorInstance, created] = await Autor.findOrCreate({
                        where: {
                            name: autor,
                        },
                        defaults: {
                            name: autor,
                        }
                    });
                    await productInstance.setAutors([autorInstance]);
                }
            }
            

            if(editorial){

                const [editorialInstance, created] = await Editorial.findOrCreate({
                    where:{
                        name:editorial,
                    },
                    defaults:{
                        name:editorial,
                    }
                });
                
                await productInstance.setEditorial(editorialInstance);
                
            }

            if (genre) {
                if (Array.isArray(genre)) {
                    const genreInstances = await Promise.all(genre.map(async (name) => {
                        const [genreInstance, created] = await Genre.findOrCreate({
                            where: {
                                name,
                            },
                            defaults: {
                                name,
                            }
                        });
                        return genreInstance;
                    }));
                    console.log(genreInstances);
                    await productInstance.setGenres(genreInstances);

                } else {
                    
                    const [genreInstance, created] = await Genre.findOrCreate({
                        where: {
                            name: genre,
                        },
                        defaults: {
                            name: genre,
                        }
                    });
                    await productInstance.setGenres(genreInstance);
                }
            }
            

            if(ISBNname){

                const [ ISBNinstance, created] = await ISBN.findOrCreate({
                    where:{
                        name:ISBNname
                    },
                    defaults:{
                        name:ISBNname
                    }
                });

                if(created) await productInstance.setISBN(ISBNinstance);
                else throw new Error("Error al crear o buscar el ISBN");
                
            }

            const updatedProductInstance = await productInstance.reload();
            
            return updatedProductInstance.get();
        }
        

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    createProductController,
}