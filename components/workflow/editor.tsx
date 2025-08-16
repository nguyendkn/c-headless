import {
  EditorRenderer,
  FreeLayoutEditorProvider,
} from '@flowgram.ai/free-layout-editor';

import '@flowgram.ai/free-layout-editor/index.css';
import { SidebarProvider, SidebarRenderer } from './components/sidebar';
import { initialData } from './data';
import { useEditorProps } from './hooks';
import { nodeRegistries } from './nodes';
import { DemoTools } from './tools';

import './styles/index.css';

export const Editor = () => {
  const editorProps = useEditorProps(initialData, nodeRegistries);
  return (
    <div className='doc-free-feature-overview'>
      <FreeLayoutEditorProvider {...editorProps}>
        <SidebarProvider>
          <div className='demo-container'>
            <EditorRenderer className='demo-editor' />
          </div>
          <DemoTools />
          <SidebarRenderer />
        </SidebarProvider>
      </FreeLayoutEditorProvider>
    </div>
  );
};
