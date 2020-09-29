import { Flip } from 'gsap/Flip';
import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
gsap.registerPlugin(Flip);

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

  // Smoothen layout of a container with items
  public filterLayout(boxes, duration, display, filter, event?): void {
    const options = {
      targets: boxes,
      duration,
      // ease: Power2.easeInOut,
      onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration}),
      onLeave: (elements, makeAbsolute) =>
        gsap.to(
          makeAbsolute(),
          {
            opacity: 0,
            scale: 0,
            duration,
            clearProps: 'all',
            onComplete: () => elements.forEach(el => el.style.cssText = 'display: none')}
        )
    };

    const context = this;
    if (filter === 'all') {
      // Show all
      // @ts-ignore
      gsap.flip({
        ...options,
        change(): void{
          gsap.set(boxes, { display });
        }
      });
    } else {
      // Show only ones that match filter
      // @ts-ignore
      gsap.flip({
        ...options,
        change(): void {
          const split = context.groupBy(boxes, filter);

          // Hide ones not matching filter
          gsap.set(split.false, { display: 'none' });

          // Show ones matching filter
          gsap.set(split.true, { display });
        }
      });
    }
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
