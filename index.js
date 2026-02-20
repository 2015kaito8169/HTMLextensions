(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('この拡張機能は「サンドボックスなしで実行」を有効にして読み込んでください。');
  }

  class UnsandboxedIframe {
    constructor() {
      this.iframe = null;
    }

    getInfo() {
    }

    displayIframe(args) {
      this.closeIframe();

      const iframe = document.createElement('iframe');
      this.iframe = iframe;
      
      iframe.src = args.URL;

      const stage = Scratch.vm.runtime.renderer.canvas.parentElement;
      stage.appendChild(iframe);
    }

    closeIframe() {
      if (this.iframe) {
        this.iframe.remove();
        this.iframe = null;
      }
    }
  }

  Scratch.extensions.register(new UnsandboxedIframe());
})(Scratch);
