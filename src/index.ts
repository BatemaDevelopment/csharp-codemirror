import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { StreamLanguage } from "@codemirror/language";
import { csharp } from "@codemirror/legacy-modes/mode/clike";
import { EditorView, basicSetup } from "codemirror";

let startState = EditorState.create({
  doc: 'Console.WriteLine("Hello, World!");',
  extensions: [
    keymap.of(defaultKeymap)
  ]
});

let view = new EditorView({
  state: startState,
  parent: document.getElementById("editor"),
  extensions: [
    basicSetup,
    StreamLanguage.define(csharp)
  ]
});

let transaction = view.state.update({ changes: {from: 0, insert: "0" } });
console.log(transaction.state.doc.toString());

view.dispatch(transaction);