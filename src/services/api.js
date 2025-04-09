// Importa a biblioteca Axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância customizada do Axios com configurações padrão
const api = axios.create({
  // Define a URL base para todas as requisições
  // Todas as chamadas serão feitas para este endpoint como prefixo
  baseURL: 'https://bobsburgers-api.herokuapp.com/characters'

});

// Exporta a instância configurada para ser usada em outros arquivos
// Isso permite que todos os componentes usem a mesma configuração base
export default api;