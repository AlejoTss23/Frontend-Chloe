import { AfterViewInit, Component, Renderer2, ElementRef} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {}


  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  ngAfterViewInit() {
    const headerEL = document.querySelector('#header-landing') as HTMLElement;
    const listItems = this.el.nativeElement.querySelectorAll("#header-landing li");
    const menuBackdrop = this.el.nativeElement.querySelector("#menu-backdrop") as HTMLElement;
  
    if (!menuBackdrop) {
      console.error("menu-backdrop element not found");
      return;
    }
  
    listItems.forEach((item: HTMLElement) => {
      item.addEventListener("mouseenter", () => {
        const { left, top, width, height } = item.getBoundingClientRect();
  
        menuBackdrop.style.setProperty("--left", `${left}px`);
        menuBackdrop.style.setProperty("--top", `${top + window.scrollY}px`);
        menuBackdrop.style.setProperty("--width", `${width}px`);
        menuBackdrop.style.setProperty("--height", `${height}px`);
        menuBackdrop.style.opacity = "1";
        menuBackdrop.style.visibility = "visible";
      });
  
      item.addEventListener("mouseleave", () => {
        menuBackdrop.style.opacity = "0";
        menuBackdrop.style.visibility = "hidden";
      });
    });
    
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          const color = entry.target.getAttribute("data-header-color");
          console.log('Color obtenido:', color);
  
          if (color) {
            headerEL.classList.remove('text-white', 'text-black');
            headerEL.classList.add(`text-${color}`);
          }
        } else {
          // Si el elemento no está intersectando, restauramos al color blanco
          headerEL.classList.remove('text-black');
          headerEL.classList.add('text-white');
        }
      });
    }, observerOptions);
  
    const sections = document.querySelectorAll(".landing-section");
    sections.forEach(section => observer.observe(section));
  }
  
  
}
