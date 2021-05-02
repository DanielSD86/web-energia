import api from "./api";

class ApiForms {
    urlApi = "";
    includesApi = [];

    constructor(url, includes = []) {
        this.urlApi = url;
        this.includesApi = includes;
    }

    ValidateData = async(schema, data) => {
        return schema.validate(data, { abortEarly: false })
            .then(function(value) {
                return {
                    status: true,
                }
            })
            .catch(function(err) {
                return {
                    status: false,
                    message: err.errors,
                }
        });
    }

    GetAll = async (page = 1, condicao = [], pageSize = 5, orderBy = "") => {
        let url = "/" + this.urlApi + "?page=" + page + "&limit=" + pageSize;
    
        for (let field in condicao) {
            if (condicao[field] !== ""){
                url = url + "&" + field + "=" + encodeURIComponent(condicao[field]);
            }
        }   

        if (this.includesApi.length > 0) {
            url = url + "&include=" + this.includesApi.join(",");
        }
        
        if (orderBy !== "") {
            url = url + "&orderby=" + orderBy;
        }
        
        return await api.get(url)    
            .then(response => {
                return { 
                    status: (response.status === 200),
                    data: response.data 
                };
            })
            .catch(error => {
                return { 
                    status: false, 
                    message: error.response.data.message 
                };
            });
    }

    GetId = async (id) => {
        let url = "/" + this.urlApi + "/" + id;

        if (this.includesApi.length > 0) {
            url = url + "?include=" + this.includesApi.join(",");
        }

        return await api.get(url)    
        .then(response => {
            return { 
                status: (response.status === 200),
                data: response.data 
            };
        })
        .catch(error => {
            return { 
                status: false, 
                message: error.response.data.message 
            };
        }); 
    }
    
    Append = async (data) => {
        return await api.post("/" + this.urlApi + "/", data)
        .then(response => {
            return { 
                status: (response.status === 201),
                data: response.data 
            };
        })
        .catch(error => {
            return { 
                status: false, 
                message: error.response.data.message 
            };
        });  
    }
    
    Update = async (id, data) => {
        return await api.put("/" + this.urlApi + "/" + id, data)
        .then(response => { 
            return { 
                status: (response.status === 200),
                data: response.data 
            };
        })
        .catch(error => {
            return { 
                status: false, 
                message: error.response.data.message 
            };
        });
    }

    Remove = async (id) => {
        return await api.delete("/" + this.urlApi + "/" + id, {})
        .then(response => { 
            return { 
                status: (response.status === 200) 
            };
        })
        .catch(error => {
            return { 
                status: false, 
                message: error.response.data.message 
            };
        });      
    }
}

export default ApiForms;