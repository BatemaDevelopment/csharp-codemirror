import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { StreamLanguage } from "@codemirror/language";
import { csharp } from "@codemirror/legacy-modes/mode/clike";

let startState = EditorState.create({
  doc: "Console.WriteLine(\"Hello, World!\");",
  extensions: [
    keymap.of(defaultKeymap),
    basicSetup,
    StreamLanguage.define(csharp)
  ],
});

let view = new EditorView({
  state: startState,
  parent: document.querySelector("#editor")!,
});