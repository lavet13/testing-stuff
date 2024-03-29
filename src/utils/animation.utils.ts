class FadeInAnimation<T extends HTMLHeadingElement | null> {
  node: T;
  startTime: number | null = null;
  duration: number = 0;
  frameId: number | null = null;

  constructor(node: T) {
    this.node = node;
  }

  start(duration: number) {
    this.duration = duration;
    if (this.duration === 0) {
      this.onProgress(1);
    } else {
      this.onProgress(0);
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  onFrame() {
    console.log('frame');
    const timePassed = performance.now() - this.startTime!;
    const progress = Math.min(timePassed / this.duration, 1);

    this.onProgress(progress);

    if (progress < 1) {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId!);

    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }

  onProgress(progress: number) {
    this.node!.style.opacity = `${progress}`;
  }
}

export default FadeInAnimation;
