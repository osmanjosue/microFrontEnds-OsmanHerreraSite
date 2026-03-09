import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { SocialIcon } from './models/socialIcons.model';
import { Certificate } from './models/certificate.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
  // Seccion #1: Información personal y breve descripción
  public certificates: Certificate[] = [
    { platform: 'Udemy', title: 'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS', month: 'Enero', date: 2024, link: 'https://www.udemy.com/certificate/UC-53ecf1b8-00d0-49a5-a948-ae2e6d2ecfd0/' },
    { platform: 'Udemy', title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN', month: 'Agosto', date: 2023, link: 'https://www.udemy.com/certificate/UC-03475c4f-f50b-491c-a1e2-4975b8aab381/' },
    { platform: 'Devtalles', title: 'GIT+GitHub: Todo un sistema de control de versiones de cero', month: 'Abril', date: 2024, link: 'https://cursos.devtalles.com/certificates/zl0noyjvkn' },
    { platform: 'Udemy', title: 'Alojamiento de sitio web en modo serverless en Amazon AWS', month: 'Julio', date: 2022, link: 'https://www.udemy.com/certificate/UC-4840328a-96c0-47c9-afa4-04f65c37096d/' },
  ]

  //Seccion #2: Lista de redes sociales con sus respectivos íconos y enlaces
  public socialIcons: SocialIcon[] = [
    { title: 'linkedin', icon: '/assets/icons/social1.svg', address: 'https://www.linkedin.com/in/osmanherrera/' },
    { title: 'whatsapp', icon: '/assets/icons/social2.svg', address: 'https://wa.me/50489709082' },
    { title: 'email', icon: '/assets/icons/social3.svg', address: 'mailto:contact@osmanherrera.dev' },
    { title: 'github', icon: '/assets/icons/social4.svg', address: 'https://github.com/osmanjosue' },
  ];

  // Seccion #3: Lista de tecnologías con sus respectivos íconos
  // a. Solo listamos los nombres que cambian
  private names: string[] = [
    'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Angular',
    'NodeJS', 'GitHub', 'Git', 'MongoDB', 'Photoshop',
    'Illustrator', 'JWT', 'Python', 'n8n', 'Docker'
  ];

  // b. Definimos el array final (vacío al inicio)
  public technologies: Array<{ title: string, icon: string }> = [];

  // c. Función para generar la ruta del ícono a partir del nombre
  getIconPath(name: string): string {
    return `/assets/icons/technologies-${name}.svg`;
  }

  ngOnInit(): void {
    // d. Generamos los objetos automáticamente
    this.technologies = this.names.map(name => ({
      title: name,
      icon: this.getIconPath(name)
    }));
  }

  // Seccion 4, colorear iconos en scroll
  @HostBinding('style.--variant')
  colorDinamico: string = 'rgb(255, 94, 0)';

  private readonly colors = [
    { r: 255, g: 94, b: 0 },
    { r: 102, g: 51, b: 153 },
    { r: 255, g: 0, b: 0 }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const percent = Math.min(Math.max(window.scrollY / scrollTotal, 0), 1);

    let r: number, g: number, b: number;

    if (percent <= 0.5) {
      const subPercent = percent * 2;
      r = this.lerp(this.colors[0].r, this.colors[1].r, subPercent);
      g = this.lerp(this.colors[0].g, this.colors[1].g, subPercent);
      b = this.lerp(this.colors[0].b, this.colors[1].b, subPercent);
    } else {
      const subPercent = (percent - 0.5) * 2;
      r = this.lerp(this.colors[1].r, this.colors[2].r, subPercent);
      g = this.lerp(this.colors[1].g, this.colors[2].g, subPercent);
      b = this.lerp(this.colors[1].b, this.colors[2].b, subPercent);
    }

    this.colorDinamico = `rgb(${r}, ${g}, ${b})`;
  }

  // Función matemática de interpolación lineal (Linear Interpolation)
  private lerp(start: number, end: number, t: number): number {
    return Math.round(start + (end - start) * t);
  }
}
