(function(Scratch) {
  'use strict';

  // サンドボックスなしチェック
  if (!Scratch.extensions.unsandboxed) {
    alert("「Run extension without sandbox」にチェックを入れてください！");
    return;
  }

  class UnsandboxedIframe {
    constructor() {
      this.iframe = null;
    }

    // ここが undefined だと TypeError になります
    getInfo() {
      return {
        id: 'unsandboxedIframeV2', // IDをユニークな文字列に固定
        name: 'HTML Stage Embed (No Sandbox)',
        blocks: [
          {
            opcode: 'displayIframe',
            blockType: Scratch.BlockType.COMMAND,
            text: 'URL [URL] を表示 X:[X] Y:[Y] 幅:[W] 高:[H]',
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com' },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 }
            }
          },
          {
            opcode: 'closeIframe',
            blockType: Scratch.BlockType.COMMAND,
            text: 'iframeを閉じる'
          }
        ]
      };
    }

    displayIframe(args) {
      this.closeIframe();

      const iframe = document.createElement('iframe');
      this.iframe = iframe;
      
      // スタイル設定
      iframe.style.position = 'absolute';
      iframe.style.border = 'none';
      iframe.style.zIndex = '10';
      
      // 座標とサイズ
      iframe.style.width = args.W + 'px';
      iframe.style.height = args.H + 'px';
      // TurboWarpのステージ中央(240, 180)を基準に計算
      iframe.style.left = (240 + Number(args.X) - (Number(args.W) / 2)) + 'px';
      iframe.style.top = (180 - Number(args.Y) - (Number(args.H) / 2)) + 'px';
      
      // サンドボックス制限を一切かけない（全開放）
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; microphone; camera; focus-without-user-activation');
      
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

  // クラスのインスタンスを登録
  Scratch.extensions.register(new UnsandboxedIframe());
})(Scratch);
