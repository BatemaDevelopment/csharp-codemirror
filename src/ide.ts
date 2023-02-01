import { EditorView, basicSetup } from "codemirror";
import { EditorState, StateField, StateEffect, Extension } from "@codemirror/state";
import { keymap, showPanel } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { StreamLanguage } from "@codemirror/language";
import { csharp } from "@codemirror/legacy-modes/mode/clike";
import { oneDarkTheme } from "@codemirror/theme-one-dark";

const toggleHelp = StateEffect.define<boolean>();

const helpPanelState = StateField.define<boolean>({
  create: () => false,
  update(value, tr) {
    for (let e of tr.effects) {
      if (e.is(toggleHelp)) {
        value = e.value;
        return value;
      }
    }
  },
  provide: f => showPanel.from(f, on => on ? createHelpPanel : null)
});

function createHelpPanel(view: EditorView) {
  const help = `
    F1: Toggle the help panel,
    Tab: Indent Code,
    Escape: Escape from the "keyboard-trap"
  `;
  let dom = document.createElement('div');
  dom.textContent = help;
  dom.className = "cm-help-panel";
  return { top: true, dom };
}

const helpKeymap = [{
  key: "F1",
  run(view) {
    view.dispatch({
      effects: toggleHelp.of(!view.state.field(helpPanelState)),
    });
    return true;
  }
}];

let output: Extension = {
  extension: [
    EditorView.updateListener.of(() => {
      function consoleTextArea(textarea: HTMLTextAreaElement) {
        document.getElementById("output").setAttribute("srcdoc", encodeURIComponent(textarea.value));
      }

      consoleTextArea(document.createElement("textarea"));
    })
  ]
};

let startState = EditorState.create({
  doc: "using System;\npublic static class Program\n{\n\tpublic static void Main(string[] args)\n\t{\n\t\tConsole.WriteLine(\"Hello, World!\");\n\t}\n}",
  extensions: [
    keymap.of(defaultKeymap),
    handleTab(),
    basicSetup,
    StreamLanguage.define(csharp),
    output,
    helpPanel(),
    oneDarkTheme,
  ]
});

;(window as any).view = new EditorView({
  state: startState,
  parent: document.querySelector("#editor")!,
});

export function handleTab() {
  return keymap.of([indentWithTab]);
}

export function helpPanel() {
  return [helpPanelState, keymap.of(helpKeymap)];
}