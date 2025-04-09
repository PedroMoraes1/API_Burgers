// Importa o componente principal PersonagensBob
// (O componente deve estar localizado em ./components/PersonagensBob.js)
import PersonagensBob from './components/PersonagensBob';

// Componente raiz da aplicação React
function App() {
  return (
    // Container principal com a classe 'App' (usada para estilização global)
    <div className="App">
      {/* Renderiza o componente PersonagensBob como conteúdo principal */}
      <PersonagensBob />
    </div>
  );
}

// Exporta o componente App como padrão
// (Este será o componente renderizado no ponto de entrada da aplicação)
export default App;