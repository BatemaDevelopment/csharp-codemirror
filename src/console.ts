import * as MirrorConsole from 'codemirror-console';

let content = document.querySelector("#editor")!;

let editor = new MirrorConsole();
editor.setText(content.textContent);
editor.swapWithElement(content);

let csharpConsole = {
  log: function (arg: any) {
    function line (text: any) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(text));
      return div;
    };

    document.getElementById("console")!.appendChild(line(arg));
  }
};

editor.runInContext({ console: csharpConsole }, function (err: any, result: any) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

editor.destroy();