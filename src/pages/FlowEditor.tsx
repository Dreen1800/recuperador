import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusCircle, MessageSquare, Clock, CheckSquare, Save, Play } from 'lucide-react';
import Button from '../components/ui/Button';
import FlowNode from '../components/flow-editor/FlowNode';
import { Card } from '../components/ui/Card';

interface FlowNodeType {
  id: string;
  type: 'message' | 'delay' | 'condition';
  title: string;
  content: string;
}

const FlowEditor = () => {
  const [flowName, setFlowName] = useState('Novo Fluxo de Mensagens');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<FlowNodeType[]>([
    {
      id: 'node-1',
      type: 'message',
      title: 'Mensagem Inicial',
      content: 'Olá! Notamos que você deixou alguns itens no carrinho. Quer completar sua compra?'
    },
    {
      id: 'node-2',
      type: 'delay',
      title: 'Espera de 2 horas',
      content: 'Aguardar 2 horas antes da próxima mensagem'
    },
    {
      id: 'node-3',
      type: 'message',
      title: 'Lembrete',
      content: 'Seu carrinho ainda está salvo! Aproveite e finalize sua compra com 10% de desconto.'
    }
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(nodes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setNodes(items);
  };

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  };

  const handleConfigureNode = (id: string) => {
    // In a real implementation, this would open a modal or panel for node configuration
    console.log(`Configure node ${id}`);
  };

  const addNode = (type: 'message' | 'delay' | 'condition') => {
    const newNode: FlowNodeType = {
      id: `node-${Date.now()}`,
      type,
      title: type === 'message' 
        ? 'Nova Mensagem' 
        : type === 'delay' 
          ? 'Espera' 
          : 'Condição',
      content: type === 'message'
        ? 'Conteúdo da mensagem'
        : type === 'delay'
          ? 'Aguardar tempo'
          : 'Definir condição'
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Flow editor main area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <input
                type="text"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="text-2xl font-bold text-gray-800 bg-transparent border-none outline-none focus:border-b focus:border-gray-300 px-1"
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" leftIcon={<Save className="h-4 w-4" />}>
                Salvar
              </Button>
              <Button leftIcon={<Play className="h-4 w-4" />}>
                Testar Fluxo
              </Button>
            </div>
          </div>
          
          <div className="flex mb-6 space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<MessageSquare className="h-4 w-4" />}
              onClick={() => addNode('message')}
            >
              Mensagem
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Clock className="h-4 w-4" />}
              onClick={() => addNode('delay')}
            >
              Espera
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<CheckSquare className="h-4 w-4" />}
              onClick={() => addNode('condition')}
            >
              Condição
            </Button>
          </div>
          
          <div className="flex justify-center">
            <div className="w-max">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="flow-nodes" direction="vertical">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-12 py-6"
                    >
                      {nodes.map((node, index) => (
                        <Draggable key={node.id} draggableId={node.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="relative"
                            >
                              <FlowNode
                                id={node.id}
                                type={node.type}
                                title={node.title}
                                content={node.content}
                                isSelected={selectedNodeId === node.id}
                                dragHandleProps={provided.dragHandleProps}
                                onSelect={handleSelectNode}
                                onDelete={handleDeleteNode}
                                onConfigure={handleConfigureNode}
                              />
                              {index < nodes.length - 1 && (
                                <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-gray-300 -mb-12"></div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => addNode('message')}
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <PlusCircle className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
      
      {/* Properties panel */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-auto">
        {selectedNodeId ? (
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Propriedades do Nó</h3>
            
            {nodes.find(n => n.id === selectedNodeId)?.type === 'message' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={nodes.find(n => n.id === selectedNodeId)?.title}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conteúdo da Mensagem
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={6}
                    defaultValue={nodes.find(n => n.id === selectedNodeId)?.content}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Use {{nome}} para incluir variáveis dinâmicas
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mídia (opcional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <span className="text-sm text-gray-500">
                      Arraste uma imagem ou clique para selecionar
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Botões de Ação (opcional)
                  </label>
                  <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                    + Adicionar Botão
                  </button>
                </div>
              </div>
            )}
            
            {nodes.find(n => n.id === selectedNodeId)?.type === 'delay' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={nodes.find(n => n.id === selectedNodeId)?.title}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo de Espera
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      className="w-20 p-2 border border-gray-300 rounded-md"
                      defaultValue={2}
                      min={1}
                    />
                    <select className="p-2 border border-gray-300 rounded-md">
                      <option value="minutes">Minutos</option>
                      <option value="hours" selected>Horas</option>
                      <option value="days">Dias</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {nodes.find(n => n.id === selectedNodeId)?.type === 'condition' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={nodes.find(n => n.id === selectedNodeId)?.title}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Condição
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Resposta do cliente</option>
                    <option>Clique em link</option>
                    <option>Valor do carrinho</option>
                    <option>Quantidade de itens</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Operador
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Contém</option>
                    <option>Não contém</option>
                    <option>Igual a</option>
                    <option>Diferente de</option>
                    <option>Maior que</option>
                    <option>Menor que</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ex: sim, 100, etc."
                  />
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button className="w-full">Aplicar Alterações</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 flex flex-col items-center justify-center h-full text-center">
            <Card className="max-w-xs p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum nó selecionado</h3>
              <p className="text-sm text-gray-600 mb-4">
                Selecione um nó no fluxo para editar suas propriedades ou adicione um novo.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  leftIcon={<MessageSquare className="h-4 w-4" />}
                  onClick={() => addNode('message')}
                >
                  Adicionar Mensagem
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  leftIcon={<Clock className="h-4 w-4" />}
                  onClick={() => addNode('delay')}
                >
                  Adicionar Espera
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  leftIcon={<CheckSquare className="h-4 w-4" />}
                  onClick={() => addNode('condition')}
                >
                  Adicionar Condição
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowEditor;