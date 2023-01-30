import { EditorView, basicSetup } from "codemirror";
import { EditorState, StateField, StateEffect, Extension } from "@codemirror/state";
import { keymap, showPanel, Panel } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
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
  let dom = document.createElement('div');
  dom.textContent = "F1: Toggle the help panel";
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

let console: Extension = {
  extension: [
    EditorView.updateListener.of(update => {
      document.getElementById("output")!.textContent = update.state.doc.toString();
    })
  ]
};

let startState = EditorState.create({
  doc: "using System;\nConsole.WriteLine(\"Hello, World!\");",
  extensions: [
    keymap.of(defaultKeymap),
    basicSetup,
    StreamLanguage.define(csharp),
    oneDarkTheme,
    helpPanel(),
    console
  ]
});

;(window as any).view = new EditorView({
  state: startState,
  parent: document.querySelector("#editor")!,
});

export function helpPanel() {
  return [helpPanelState, keymap.of(helpKeymap)];
}