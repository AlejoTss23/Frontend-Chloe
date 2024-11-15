import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  articles = [
    { title: 'Qué esperar de un proceso de selección', action: 'link', link: '#', contentId: 'selection-process' },
    { title: 'Los puestos emergentes que van a petarlo', action: 'modal', contentId: 'emergent-positions' },
    { title: 'Las opinión de las empresas', action: 'link', link: '#', contentId: 'company-opinion' },
    { title: '¿Sin experiencia? Destaca en las entrevistas', action: 'modal', contentId: 'no-experience' }
  ];

  getCardClasses(index: number) {
    const baseClasses = 'bg-[#1F434F] bg-opacity-90 rounded-lg overflow-hidden relative group flex items-center justify-center w-full transform hover:scale-95 transition-all duration-200';
    let heightClass = '';

    switch (index) {
      case 0:
        heightClass = 'h-60';
        break;
      case 1:
        heightClass = 'h-48';
        break;
      case 2:
        heightClass = 'h-72';
        break;
      default:
        heightClass = 'h-60';
    }

    return `${baseClasses} ${heightClass}`;
  }
}


