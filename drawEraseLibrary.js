import { LightningElement } from 'lwc';

export default class DrawEraseLibrary extends LightningElement {
  isDrawing = false;
  context;
  drawMode = 'draw'; // or 'erase'

  renderedCallback() {
    if (!this.context) {
      const canvas = this.template.querySelector('canvas');
      this.context = canvas.getContext('2d');
      this.context.lineWidth = 4;
      this.context.lineCap = 'round';
      this.context.strokeStyle = '#000';
    }
  }

  setDrawMode() {
    this.drawMode = 'draw';
    this.context.strokeStyle = '#000';
  }

  setEraseMode() {
    this.drawMode = 'erase';
    this.context.strokeStyle = '#fff'; // Background color
  }

  startDrawing(event) {
    this.isDrawing = true;
    this.context.beginPath();
    const pos = this.getMousePos(event);
    this.context.moveTo(pos.x, pos.y);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  draw(event) {
    if (!this.isDrawing) return;

    const pos = this.getMousePos(event);
    this.context.lineTo(pos.x, pos.y);
    this.context.stroke();
  }

  getMousePos(event) {
    const canvas = this.template.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  clearCanvas() {
    const canvas = this.template.querySelector('canvas');
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }
}