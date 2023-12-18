import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

export default function setupEditors({ apiResponse }) {
  const jsonResponseBody = apiResponse;

  const defaultTabBinding = EditorState.tabBinding(EditorState.indentUnit.of(2));

  const basicExtensions = [
    basicSetup,
    keymap.of([defaultTabBinding]),
    json(),
    EditorState.tabSize.of(2) // 2 spaces for every tab
  ];

  // Create new Editor
  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: JSON.stringify({}, null, 2),
      extensions: [...basicExtensions, EditorView.editable.of(false)], // Corrected typo here
    }),
    parent: jsonResponseBody,
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }

  return { updateResponseEditor };
}