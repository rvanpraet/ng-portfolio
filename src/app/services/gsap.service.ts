// import { Flip } from 'gsap/Flip.js';
import { Injectable } from '@angular/core';
import { gsap, Power2 } from 'gsap';
// gsap.registerPlugin(Flip);

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() {}

  // Get positions for animating modal from clicked element
  public getPosition(elem, target): {left, top, width, height} {

    const targetRect = target.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    gsap.set(elem, {
      x: 0,
      y: 0,
      width: targetRect.width,
      height: targetRect.height
    });
    const newRect = elem.getBoundingClientRect();
    gsap.set(elem, { width: elemRect.width, height: elemRect.height });
    return {
      left: targetRect.left - newRect.left,
      top: targetRect.top - newRect.top,
      width: newRect.width,
      height: newRect.height
    };
  }

  public set(targets, vars): gsap.core.Tween {
    return gsap.set(targets, vars);
  }

  public from(el, duration, vars): gsap.core.Tween {
    return gsap.from(el, duration, vars);
  }

  public to(el, duration, vars): gsap.core.Tween {
    return gsap.to(el, duration, vars);
  }

  public fromTo(el, duration, fromVars, toVars): gsap.core.Tween {
    return gsap.fromTo(el, duration, fromVars, toVars);
  }

  public timeline(vars?): gsap.core.Timeline {
    return gsap.timeline(vars);
  }

  public scaleHide(el, duration): void {
    gsap.to(el, duration, {scale: 0, display: 'none', ease: Power2.easeInOut});
  }

  public scaleShow(el, duration, display): void {
    gsap.to(el, duration, {scale: 1, display, ease: Power2.easeInOut});
  }


  // Smoothen layout of a container with items
  public filterLayout(boxes, duration, display, filter, event?): void {

    // const options = {
    //   targets: boxes,
    //   duration: 1,
    //   onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
    //   onLeave: (elements, makeAbsolute) =>
    //     gsap.to(
    //       makeAbsolute(),
    //       {
    //         opacity: 0,
    //         scale: 0,
    //         duration: 1,
    //         clearProps: 'all',
    //         onComplete: () => elements.forEach(el => el.style.cssText = 'display: none')}
    //     )
    // };

    // if (filter === 'all') {
    //   // Show all
    //   gsap.flip({
    //     ...options,
    //     change(): void{
    //       gsap.set(boxes, { display });
    //     }
    //   });
    // } else {
    //   // Show only ones that match filter
    //   gsap.flip({
    //     ...options,
    //     change(): void {
    //       const split = this.groupBy(boxes, filter);

    //       // Hide ones not matching filter
    //       gsap.set(split.false, { display: 'none' });

    //       // Show ones matching filter
    //       gsap.set(split.true, { display });
    //     }
    //   });
    // }
  }

  public groupBy(arr, className): { true, false } {
    return arr.reduce((memo, x) => {
      if (!memo[x.classList.contains(className)]) { memo[x.classList.contains(className)] = []; }
      memo[x.classList.contains(className)].push(x);
      return memo;
    }, {});
  }

  public initBoxLayout(el: HTMLElement): any {
    gsap.set(el, {x: '+=0'});
    return {
      node: el,
      x: el.offsetLeft,
      y: el.offsetTop,
      transform: {
        x: gsap.getProperty(el, 'x'),
        y: gsap.getProperty(el, 'y')
      }
    };
  }
}
