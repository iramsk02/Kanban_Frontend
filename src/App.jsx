import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from './components/KanbanBoard';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanBoard />
        </DndProvider>
    );
}

export default App;
