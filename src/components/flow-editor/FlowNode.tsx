import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { MessageSquare, Clock, X, AlertTriangle, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FlowNodeProps {
  id: string;
  type: 'message' | 'delay' | 'condition';
  title: string;
  content: string;
  isSelected: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onConfigure: (id: string) => void;
}

const FlowNode = ({
  id,
  type,
  title,
  content,
  isSelected,
  dragHandleProps,
  onSelect,
  onDelete,
  onConfigure
}: FlowNodeProps) => {
  const getNodeIcon = () => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'delay':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'condition':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNodeColor = () => {
    switch (type) {
      case 'message':
        return 'border-blue-200 bg-blue-50';
      case 'delay':
        return 'border-amber-200 bg-amber-50';
      case 'condition':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div
      className={cn(
        'w-64 rounded-lg border-2 shadow-sm transition-all',
        getNodeColor(),
        isSelected ? 'ring-2 ring-blue-500' : '',
        'relative'
      )}
      onClick={() => onSelect(id)}
    >
      <div
        className="p-3 border-b border-gray-200 bg-white rounded-t-lg cursor-move flex items-center"
        {...dragHandleProps}
      >
        <div className="flex items-center space-x-2">
          {getNodeIcon()}
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        <div className="ml-auto flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfigure(id);
            }}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-3 text-sm text-gray-600">
        {content}
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
    </div>
  );
};

export default FlowNode;