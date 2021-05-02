import apiForms from "../../services/api-forms";
import * as yup from 'yup';
import api from "../../services/api";

class ApiService extends apiForms {
    projetosSchema = yup.object().shape({
        modulo_id: yup
            .number()
            .required("Modulo ID é obrigatório")
            .moreThan(0, "Modulo ID é obrigatório"),
        potencia: yup
            .number()
            .required("Potência é obrigatória")
            .moreThan(0, "Potência deve ser maior que zero"),
    });

    defaultValues = {
        modulo_id: 0,
        potencia: 0,
    }

    constructor() {
        super("energia/projetos", ["inversores"]);
    }

    getProdutos = async () => {
        let url = "/energia/produtos?orderby=tipo";
        
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

    calcularProjeto = async (data) => {
        return await api.post("/energia/projetosinversores/calcular/", data)
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
}

export default new ApiService();