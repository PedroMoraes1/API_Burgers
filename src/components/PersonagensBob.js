import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PersonagensBob.css';

function PersonagensBob() {
  // Estados do componente
  const [personagens, setPersonagens] = useState([]); // Armazena todos os personagens
  const [filtrados, setFiltrados] = useState([]); // Armazena personagens filtrados
  const [carregando, setCarregando] = useState(true); // Controla estado de carregamento
  const [busca, setBusca] = useState(''); // Armazena termo de busca
  const [iniciais, setIniciais] = useState({}); // Armazena contagem por inicial

  // Efeito para carregar dados da API quando o componente monta
  useEffect(() => {
    api.get('/')
      .then(response => {
        const dados = response.data;
        setPersonagens(dados);
        setFiltrados(dados);
        calcularIniciais(dados);
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro:", error);
        setCarregando(false);
      });
  }, []); // Array vazio = executa apenas uma vez

  // Calcula quantos personagens existem por letra inicial
  const calcularIniciais = (lista) => {
    const contagem = {};
    lista.forEach(p => {
      const inicial = p.name.charAt(0).toUpperCase();
      contagem[inicial] = (contagem[inicial] || 0) + 1;
    });
    setIniciais(contagem);
  };

  // Manipulador de busca por input de texto
  const handleBusca = (e) => {
    const termo = e.target.value;
    setBusca(termo);
    
    // Filtra personagens que contêm o termo de busca (em qualquer parte do nome)
    setFiltrados(termo === '' ? 
      personagens : 
      personagens.filter(p => 
        p.name.toLowerCase().includes(termo.toLowerCase())
    ));
  };

  // Filtra personagens por letra inicial (primeira letra do nome)
  const filtrarPorInicial = (inicial) => {
    const resultados = personagens.filter(p => 
      p.name.charAt(0).toUpperCase() === inicial
    );
    setFiltrados(resultados);
    setBusca(inicial); // Atualiza o campo de busca com a letra selecionada
  };

  // Exibe estado de carregamento
  if (carregando) return <div className="loading">Carregando...</div>;

  // Renderização do componente
  return (
    <div className="personagens-container">
      <h1>Personagens de Bob's Burgers</h1>
      
      {/* Seção de controles de busca */}
      <div className="controles-busca">
        {/* Input de busca por texto */}
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={busca}
          onChange={handleBusca}
          className="barra-busca"
        />
        
        {/* Lista de botões por inicial */}
        <div className="iniciais-container">
          {Object.entries(iniciais).sort().map(([letra, quantidade]) => (
            <button 
              key={letra}
              onClick={() => filtrarPorInicial(letra)}
              className={`inicial-btn ${
                // Marca o botão como ativo se o primeiro personagem filtrado começar com essa letra
                filtrados.length > 0 && 
                filtrados[0].name.charAt(0).toUpperCase() === letra ? 'ativo' : ''
              }`}
            >
              {letra} ({quantidade}) {/* Ex: A (5) */}
            </button>
          ))}
        </div>
      </div>
      
      {/* Grid de personagens */}
      <div className="personagens-grid">
        {filtrados.length > 0 ? (
          // Mapeia cada personagem filtrado para um card
          filtrados.map(personagem => (
            <div key={personagem.id} className="personagem-card">
              <div className="card-imagem">
                <img 
                  src={personagem.image} 
                  alt={personagem.name}
                  onError={(e) => { // Fallback para imagens quebradas
                    e.target.src = 'https://via.placeholder.com/150x200?text=Sem+imagem';
                  }}
                />
              </div>
              <div className="card-info">
                <h3>{personagem.name}</h3>
                {/* Trata occupation que pode ser string ou array */}
                <p><strong>Ocupação:</strong> {Array.isArray(personagem.occupation) ? 
                  personagem.occupation.join(', ') : personagem.occupation || 'Não informada'}</p>
                <p><strong>Voz por:</strong> {personagem.voicedBy || '?'}</p>
              </div>
            </div>
          ))
        ) : (
          // Mensagem quando nenhum personagem é encontrado
          <div className="nenhum-resultado">
            Nenhum personagem encontrado com "{busca}"
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonagensBob;