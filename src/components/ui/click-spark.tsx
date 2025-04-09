'use client';

import { useEffect } from 'react';

// ClickSpark Custom Element implementation
export function initClickSpark() {
  if (typeof window !== 'undefined' && !customElements.get('click-spark')) {
    class ClickSpark extends HTMLElement {
      private svg: SVGElement | null = null;
      private _parent: Node | null = null;

      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        if (this.shadowRoot) {
          this.shadowRoot.innerHTML = this.createSpark();
          this.svg = this.shadowRoot.querySelector("svg");
          this._parent = this.parentNode;
          this._parent?.addEventListener("click", this);
        }
      }

      disconnectedCallback() {
        this._parent?.removeEventListener("click", this);
        this._parent = null;
      }

      handleEvent(e: MouseEvent) {
        this.setSparkPosition(e);
        this.animateSpark();
      }

      animateSpark() {
        if (!this.svg) return;
        
        let sparks = [...this.svg.children] as SVGLineElement[];
        let size = parseInt(sparks[0].getAttribute("y1") || "0");
        let offset = size / 2 + "px";

        let keyframes = (i: number) => {
          let deg = `calc(${i} * (360deg / ${sparks.length}))`;

          return [
            {
              strokeDashoffset: size * 3,
              transform: `rotate(${deg}) translateY(${offset})`
            },
            {
              strokeDashoffset: size,
              transform: `rotate(${deg}) translateY(0)`
            }
          ];
        };

        let options = {
          duration: 800,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          fill: "forwards" as FillMode
        };

        sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
      }

      setSparkPosition(e: MouseEvent) {
        this.style.left = e.pageX - this.clientWidth / 2 + "px";
        this.style.top = e.pageY - this.clientHeight / 2 + "px";
      }

      createSpark() {
        return `
          <style>
            :host {
              position: absolute;
              pointer-events: none;
              z-index: 999;
            }
          </style>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="var(--click-spark-color, #FDE533)" transform="rotate(-20)">
            ${Array.from(
              { length: 8 },
              (_) =>
                `<line x1="50" y1="30" x2="50" y2="4" stroke-dasharray="30" stroke-dashoffset="30" style="transform-origin: center" />`
            ).join("")}
          </svg>
        `;
      }
    }

    customElements.define("click-spark", ClickSpark);
  }
}

// React component to inject the click-spark
export function ClickSparkEffect({ color = "#FDE533" }: { color?: string }) {
  useEffect(() => {
    initClickSpark();
    
    // Create the spark element
    const spark = document.createElement('click-spark');
    
    // Set the color
    if (color) {
      spark.style.setProperty('--click-spark-color', color);
    }
    
    // Add it to the body
    document.body.appendChild(spark);
    
    // Clean up on unmount
    return () => {
      document.body.removeChild(spark);
    };
  }, [color]);
  
  // This component doesn't render anything visible
  return null;
} 