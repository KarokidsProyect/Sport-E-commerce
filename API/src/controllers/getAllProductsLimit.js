const { Products,Author,Genre,ISBN,ReleasedDate,Editorial } = require("../db");

//toma todos los productos pero trae solo los primeros 20 segun la pagina que se encuentre

const itemPerPage = 2;// la cantidad de items que se mandaran a partir de la pagina que este posicionado

const getAllProductsLimit = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const response = await Products.findAndCountAll({
            offset,
            limit:itemPerPage,
            include: [
                { model: Author, as: 'Authors' },
                { model: ReleasedDate, as: 'ReleasedDate' },  
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },     
                { model: ISBN, as: 'ISBN' }
              ]
        });

        const data = {
            totalPages: Math.ceil(response.count / itemPerPage),
            currentPage: page,
            numberOfResults: response.count,
            data: response,
        };
        return data;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProductsLimit,
}