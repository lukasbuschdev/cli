import { Component, inject } from '@angular/core';
import { Effect } from './models/effect';
import { Router } from '@angular/router';
import { CmdComponent } from "./cmd/cmd.component";

@Component({
  selector: 'app-root',
  imports: [CmdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  router = inject(Router);
  
  ngAfterViewInit(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let lastTime = 0;
    let fps = 15;
    let nextFrame = 1000/fps;
    let timer = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let gradient = this.createGradient(ctx, canvas.width, canvas.height);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      fps = 15;
      nextFrame = 1000 / fps;

      effect.resize(canvas.width, canvas.height);
      gradient = this.createGradient(ctx, canvas.width, canvas.height);
    });

    const effect = new Effect(canvas.width, canvas.height);

    this.animate(ctx, effect, canvas, 0, lastTime, nextFrame, timer, gradient);
  }

  animate(ctx: any, effect: Effect, canvas: any, timeStamp: any, lastTime: number, nextFrame: number, timer: number, gradient: any): void {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if(timer > nextFrame) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
      ctx.textAlign = 'center'
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.font = effect.fontSize + 'px "OCRAbyBT", monospace';
      effect.symbols.forEach(symbol => symbol.draw(ctx));
      timer = 0;
    } else {
      timer += deltaTime;
    }

    requestAnimationFrame((newTimeStamp: number) => this.animate(ctx, effect, canvas, newTimeStamp, lastTime, nextFrame, timer, gradient));
  }

  private createGradient(ctx: CanvasRenderingContext2D, width: number, height: number): CanvasGradient {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#00ffc83d');
    gradient.addColorStop(0.2, '#003300');
    gradient.addColorStop(0.3, '#1ba5003d');
    gradient.addColorStop(0.5, 'transparent');
    gradient.addColorStop(0.7, '#1ba5003d');
    gradient.addColorStop(0.8, '#003300');
    gradient.addColorStop(1, '#00ffc83d');
    return gradient;
  }
}
